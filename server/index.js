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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
