// src/main.js

import BootScene from './scenes/BootScene.js'; // Novo
import TitleScene from './scenes/TitleScene.js';
import CharacterSelectionScene from './scenes/CharacterSelectionScene.js';
import MapScene from './scenes/MapScene.js'; // Você deve criar esta classe!
import GameScene from './scenes/GameScene.js';
import ResultScene from './scenes/ResultScene.js'; // Se quiser a tela de Ranking/Resultado
import PlayerData from "./PlayerData.js";

// ... (config)

const config = {
    type: Phaser.AUTO,
    // 1. Mantenha as dimensões FIXAS (resolução interna de design)
    width: 800,   
    height: 600,  
    parent: 'game-container',
    
    scale: {
        // 2. Use FIT para esticar esse 800x600 no máximo do contêiner 100%x100%
        mode: Phaser.Scale.RESIZE,
        zoom: 1,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        dom: {
            createContainer: true
        }, 
        parent: 'game-container',
    },
    
    scene: [
        BootScene,                 // Primeira a ser chamada!
        TitleScene,
        CharacterSelectionScene,
        MapScene,
        GameScene,
        ResultScene
    ]
};

const game = new Phaser.Game(config);

game.playerData = new PlayerData();