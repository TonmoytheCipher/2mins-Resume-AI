const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini using your .env key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 1. Generate Bullet Points for Experience
const generateDescription = async (req, res) => {
  try {
    const { prompt: userPrompt } = req.body; // Usually takes the job title or basic description from the frontend

    const prompt = `
      Write 3 professional, ATS-friendly resume bullet points for the following role or description:
      ${userPrompt}
      
      Start each bullet point with a strong action verb. Do not include asterisks or markdown formatting.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ description: text }); // Note: Ensure your frontend expects 'description' or update accordingly
  } catch (error) {
    console.error("AI Description Error:", error);
    res.status(500).json({ message: "Failed to generate description", error: error.message });
  }
};

// 2. Generate Professional Summary
const generateSummary = async (req, res) => {
  try {
    const { personalInfo, experience, education, skills } = req.body;

    const prompt = `
      Write a highly professional resume summary for a candidate with the following details:
      Name: ${personalInfo?.fullName || 'A professional'}
      Skills: ${skills}
      Experience: ${JSON.stringify(experience)}
      Education: ${JSON.stringify(education)}
      
      Make it 3-4 sentences long, impactful, ATS-friendly, and written in the first person. 
      Do not include any markdown formatting or asterisks, just the plain text paragraph.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ summary: text });
  } catch (error) {
    console.error("AI Summary Error:", error);
    res.status(500).json({ message: "Failed to generate summary", error: error.message });
  }
};

// Export BOTH functions so the routes file doesn't crash!
module.exports = { generateDescription, generateSummary };