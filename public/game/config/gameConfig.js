// Primeiro, importe todas as cenas
import BootScene from '../scenes/BootScene.js';
import CharacterSelectionScene from '../scenes/CharacterSelectionScene.js';
import GameScene from '../scenes/GameScene.js';
import ResultScene from '../scenes/ResultScene.js';

export const UIConfig = {
    fontColor: '#111',
    fontSize: { small: 18, medium: 24, large: 32 },
    colors: {
        background: 0xADD8E6,
        correct: 0x5cb85c,
        wrong: 0xd9534f,
        warning: '#FF0000',
        normal: '#FFC107'
    },
    spacing: { margin: 20, button: 15 }
};

export const Config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    dom: { createContainer: true },
    scene: [BootScene, CharacterSelectionScene, GameScene, ResultScene]
};

