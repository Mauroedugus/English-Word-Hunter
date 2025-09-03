const path = require("path");
const fs = require("fs");

function getRandomFromJson(fileName) {
    const filePath = path.join("public/game/data", fileName);
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData);
    const randomItem = jsonData[Math.floor(Math.random()* jsonData.length)];
    return randomItem;
}

function getWordToImage() {
    return getRandomFromJson("word_to_images.json");
  }
  
  function getImageToWord() {
    return getRandomFromJson("image_to_words.json");
  }
  
  module.exports = {
    getWordToImage,
    getImageToWord
  };