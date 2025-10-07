//Rota para buscar palavras da API IA (GPT / WordsAPI)

// routes/words.js
const express = require("express");
const router = express.Router();
const { gerarPalavras } = require("../services/wordService");
const { buscarImagem } = require("../services/imageService");

router.get("/generate", async (req, res) => {
  const { nivel = "facil" } = req.query;

  try {
    const palavras = await gerarPalavras(nivel);

    // Para cada palavra buscar imagem
    const imagensPromises = palavras.map(p => buscarImagem(p));
    const imagens = await Promise.all(imagensPromises);

    // Montar resposta
    const resultado = palavras.map((palavra, i) => ({
      palavra,
      imagem: imagens[i],
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar palavras e imagens" });
  }
});

module.exports = router;