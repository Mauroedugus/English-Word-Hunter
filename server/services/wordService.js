//Código para consumir API IA (OpenAI, WordsAPI)

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function gerarPalavras(nivel) {
  // Prompt simples para gerar 3 palavras em inglês fáceis, médias, difíceis etc.
  const prompt = `Liste 3 palavras em inglês simples para crianças no nível ${nivel}, sem tradução, só as palavras separadas por vírgula.`;

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Você é um assistente que gera palavras simples em inglês para crianças." },
      { role: "user", content: prompt },
    ],
  });

  // Extrair as palavras do texto, exemplo: "apple, cat, dog"
  const palavrasTexto = response.data.choices[0].message.content.trim();
  const palavras = palavrasTexto.split(",").map(p => p.trim().toLowerCase());

  return palavras;
}

module.exports = { gerarPalavras };