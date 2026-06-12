const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

// Set up Multer for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/process-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded.' });
    }

    console.log('PDF received, extracting text...');
    
    // 1. Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const textContent = pdfData.text;

    if (!textContent || textContent.trim() === '') {
       return res.status(400).json({ error: 'Could not extract text from the PDF. It might be scanned or image-based.' });
    }

    console.log('Text extracted. Sending to Gemini for processing...');

    // 2. Call Gemini API to process and format the text
    // Using a system prompt to strictly enforce JSON output format
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an expert educational content parser. 
      I will provide you with the raw text extracted from a textbook PDF (which may contain both Bengali and English text, or just one).
      
      Your task is to analyze the text and divide it into logical chapters or major sections.
      For each chapter, extract the content and separate it into a Bengali version and an English version.
      If the original text is only in Bengali, provide the Bengali content and translate it to English for the englishContent field.
      If the original text is only in English, provide the English content and translate it to Bengali for the banglaContent field.
      If both are present, separate them accordingly.

      Return the result STRICTLY as a JSON array of objects. Do not include any markdown formatting like \`\`\`json or \`\`\` in your response. 
      The JSON array should have the following structure:
      [
        {
          "id": 1,
          "title": "অধ্যায় ১: [নাম] / Chapter 1: [Name]",
          "banglaContent": "বাংলা কন্টেন্ট এখানে...",
          "englishContent": "English content here..."
        },
        ...
      ]

      Here is the raw text from the PDF:
      ---
      ${textContent.substring(0, 30000)} // Limiting text to avoid token limits for now
      ---
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log('Gemini processing complete.');

    // 3. Clean up the response to ensure it's valid JSON
    // Sometimes Gemini wraps JSON in markdown blocks
    let jsonStr = responseText.trim();
    if (jsonStr.startsWith('\`\`\`json')) {
      jsonStr = jsonStr.substring(7);
    }
    if (jsonStr.startsWith('\`\`\`')) {
      jsonStr = jsonStr.substring(3);
    }
    if (jsonStr.endsWith('\`\`\`')) {
      jsonStr = jsonStr.substring(0, jsonStr.length - 3);
    }

    const chapters = JSON.parse(jsonStr.trim());

    res.json({ chapters });

  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ 
      error: 'An error occurred while processing the PDF.',
      details: error.message 
    });
  }
});

app.post('/api/generate-questions', async (req, res) => {
  try {
    const { class: className, subject, book, chapter, formats } = req.body;

    if (!book || !chapter || !formats || formats.length === 0) {
      return res.status(400).json({ error: 'Book, chapter, and at least one format are required.' });
    }

    console.log(`Generating questions for Book: ${book}, Chapter: ${chapter}, Formats: ${formats.join(', ')}`);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an expert educational content creator for Bangladeshi curriculum.
      Please generate questions for Class ${className}, Subject: ${subject}.
      Book Name: ${book}
      Chapter/Unit: ${chapter}
      
      Generate questions in Bengali language for the following requested formats: ${formats.join(', ')}.
      
      Requirements for formats:
      - For "Creative MCQ" (সিজোনশীল এমসিকিউ): Provide multiple-choice questions with 4 options and specify the correct answer.
      - For "Creative Question" (সৃজনশীল প্রশ্ন): Provide a stimulus (উদ্দীপক) followed by 4 questions (ক, খ, গ, ঘ) with their marks. Include a suggested answer or hints for each.
      - For "Short Question" (সংক্ষিপ্ত প্রশ্ন): Provide simple short answer questions with their direct answers.
      
      Return the result STRICTLY as a JSON array of objects. Do not include any markdown formatting like \`\`\`json or \`\`\` in your response.
      The JSON array should have the following structure:
      [
        {
          "type": "mcq", 
          "question": "Question text here...",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "Correct option text here..."
        },
        {
          "type": "cq",
          "stimulus": "Stimulus text here...",
          "questions": [
            { "label": "ক", "question": "Question text...", "marks": 1, "answer": "Hint or answer..." },
            { "label": "খ", "question": "Question text...", "marks": 2, "answer": "Hint or answer..." },
            { "label": "গ", "question": "Question text...", "marks": 3, "answer": "Hint or answer..." },
            { "label": "ঘ", "question": "Question text...", "marks": 4, "answer": "Hint or answer..." }
          ]
        },
        {
          "type": "short",
          "question": "Question text here...",
          "answer": "Answer here..."
        }
      ]
      
      Generate a good mix of questions for the given chapter and formats (around 5-10 items total). Ensure they are highly relevant and accurate.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log('Gemini generated questions successfully.');

    let jsonStr = responseText.trim();
    if (jsonStr.startsWith('\`\`\`json')) {
      jsonStr = jsonStr.substring(7);
    }
    if (jsonStr.startsWith('\`\`\`')) {
      jsonStr = jsonStr.substring(3);
    }
    if (jsonStr.endsWith('\`\`\`')) {
      jsonStr = jsonStr.substring(0, jsonStr.length - 3);
    }

    const generatedQuestions = JSON.parse(jsonStr.trim());

    res.json({ questions: generatedQuestions, suggestionId: Date.now().toString() });

  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ 
      error: 'An error occurred while generating questions.',
      details: error.message 
    });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
