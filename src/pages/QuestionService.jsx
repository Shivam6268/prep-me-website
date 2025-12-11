import axios from "axios";

const API_KEY = "AIzaSyBDaP-KrfkeENDdcG6sUsdPq2MGlpUNzD8";

export async function generateInterviewQuestions(profileData) {
  const skills = profileData.technologies || [];
  const EXPECTED_COUNT = skills.length * 10;

  const prompt = `
You are a strict JSON API.

Generate EXACTLY 10 interview items PER SKILL.

RETURN ONLY this format:
[
  {"category":"string","difficulty":"Easy|Medium|Hard","question":"string","answers":"string"}
]

Skills: ${skills.join(", ")}

STRICT RULES:
No markdown, no comments, no extra text, output only raw JSON.
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.5, maxOutputTokens: 4000 }
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    let questionsArray = [];

    try {
      const cleanJson = rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/,\s*]/g, "]")
        .replace(/,\s*}/g, "}")
        .replace(/\r?\n|\r/g, " ")
        .trim();

      questionsArray = JSON.parse(cleanJson);
    } catch (err) {
      console.error("❌ Broken JSON from Gemini:", rawText);

      // ✅ HARD FAIL-SAFE WITH FULL SCHEMA
      let idCounter = 1;
      questionsArray = [];

      skills.forEach(skill => {
        for (let i = 0; i < 10; i++) {
          questionsArray.push({
            id: idCounter++,
            category: skill,
            question: `Sample question ${i + 1} for ${skill}?`,
            difficulty: "Medium",
            answers: "Answer unavailable due to malformed AI response."
          });
        }
      });

      return questionsArray;
    }

    // ✅ FINAL NORMALIZATION WITH IDS
    let idCounter = 1;
    const finalData = questionsArray.slice(0, EXPECTED_COUNT).map(item => ({
      id: idCounter++,
      category: item.category || "General",
      question: item.question,
      difficulty: item.difficulty || "Medium",
      answers: item.answers || item.answer || "Not provided"
    }));

    return finalData;

  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw error;
  }
}
