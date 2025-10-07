const express = require("express");
const router = express.Router();
const {
    getWordToImage,
    getImageToWord
  } = require("../services/easyService");

router.get("/word-to-image", (req,res) => {
    try{
        const item = getWordToImage();
        res.json(item);
    }catch (err) {
        res.status(500).json({error: "Erro ao carregar modo facil"});
    }
});

router.get("/image-to-word", (req,res) => {
    try{
        const item = getImageToWord();   
        res.json(item);
    }catch (err) {
        res.status(500).json({error: "Erro ao carregar modo facil"});
    }
});

module.exports = router;