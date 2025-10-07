//Código para consumir API de imagens (Unsplash)

const axios = require("axios");
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

async function buscarImagem(palavra) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(palavra)}&per_page=1&orientation=squarish`;

  const response = await axios.get(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  });

  if (response.data.results.length > 0) {
    return response.data.results[0].urls.small;
  }
  return null;
}

module.exports = { buscarImagem };