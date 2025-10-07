// public/game/scenes/CharacterSelectionScene.js

import PlayerData from '../PlayerData.js';

export default class CharacterSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelectionScene' });

        // Cria a instância do PlayerData
        this.playerData = new PlayerData();

        // Valores padrão
        this.selectedAvatar = 'avatar_boy';
    }

    create() {
        const gameWidth = this.sys.game.canvas.width;
        const gameHeight = this.sys.game.canvas.height;
        const centerX = gameWidth / 2;
    
        // --- Fundo ---
        this.add.image(centerX, gameHeight / 2, 'clean_background')
            .setOrigin(0.5)
            .setDisplaySize(gameWidth, gameHeight)
            .setDepth(-1);
    
        // --- Título ---
        this.add.text(centerX, 80, 'Escolha seu Avatar e Nome', { 
            fontFamily: 'Baloo Bhaina',
            fontSize: '50px', 
            fill: '#FFFFFF' 
        }).setOrigin(0.5);
    
        // --- Criação manual do input DOM ---
        const htmlInput = document.createElement("input");
        htmlInput.type = "text";
        htmlInput.placeholder = "Digite seu nome...";
        htmlInput.style.position = "absolute";
        htmlInput.style.left = "50%";
        htmlInput.style.top = "180px";
        htmlInput.style.transform = "translateX(-50%)";
        htmlInput.style.fontSize = "24px";
        htmlInput.style.padding = "8px 12px";
        htmlInput.style.width = "260px";
        htmlInput.style.borderRadius = "10px";
        htmlInput.style.border = "2px solid #007ACC";
        htmlInput.style.textAlign = "center";
        htmlInput.style.outline = "none";
        htmlInput.style.background = "#fff";
        htmlInput.style.color = "#000";
        htmlInput.style.zIndex = "9999";
    
        // 🔹 Adiciona ao container real do Phaser (não apenas ao canvas)
        document.getElementById("game-container").appendChild(htmlInput);
    
        htmlInput.addEventListener("input", (e) => {
            this.playerData.name = e.target.value || "Player";
        });
    
        // --- Avatares ---
        const avatarY = gameHeight * 0.55;
        const spacing = gameWidth * 0.15;
    
        this.avatarBoy = this.add.image(centerX - spacing, avatarY, 'avatar_boy').setScale(0.8);
        this.avatarGirl = this.add.image(centerX + spacing, avatarY, 'avatar_girl').setScale(0.8);
    
        [this.avatarBoy, this.avatarGirl].forEach(avatar => {
            avatar.setInteractive({ useHandCursor: true });
            avatar.on('pointerdown', () => this.selectAvatar(avatar.texture.key));
        });
    
        this.updateAvatarSelection();
    
        // --- Botão CONTINUAR ---
        const buttonWidth = 250;
        const buttonHeight = 80;
        const buttonY = gameHeight * 0.85;
    
        const continueButton = this.add.container(centerX, buttonY);
    
        const buttonText = this.add.text(0, buttonHeight / 2, 'CONTINUAR', { 
            fontFamily: 'Baloo Bhaina',
            fontSize: '30px',
            fill: '#FFF',
            fontStyle: '700'
        }).setOrigin(0.5);
        
        const buttonShadow = this.add.graphics();
        buttonShadow.fillStyle(0x0088AD);
        buttonShadow.fillRoundedRect(-buttonWidth / 2, 8, buttonWidth, buttonHeight, 40);
        
        const topButton = this.add.graphics();
        topButton.fillStyle(0x00B2E3);
        topButton.fillRoundedRect(-buttonWidth / 2, 0, buttonWidth, buttonHeight, 40);
    
        continueButton.add([buttonShadow, topButton, buttonText]);
        continueButton.setInteractive(new Phaser.Geom.Rectangle(-buttonWidth / 2, 0, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
    
        continueButton.on('pointerdown', () => {
            topButton.y = 8;
            buttonText.y = buttonHeight / 2 + 8;
        });
    
        continueButton.on('pointerup', () => {
            topButton.y = 0;
            buttonText.y = buttonHeight / 2;
    
            // 🔹 Remove o input do DOM ao sair da cena
            htmlInput.remove();
    
            // Define valores padrão se o jogador não digitar
            if (!this.playerData.name) this.playerData.name = "Player";
            if (!this.playerData.avatar) this.playerData.avatar = this.selectedAvatar;
    
            this.scene.start('MapScene', { playerData: this.playerData });
        });
    }
    
    

    selectAvatar(key) {
        this.selectedAvatar = key;
        this.playerData.avatar = key; // Atualiza PlayerData
        this.updateAvatarSelection();
    }

    updateAvatarSelection() {
        // Remove destaque
        this.avatarBoy.setTint(0xFFFFFF);
        this.avatarGirl.setTint(0xFFFFFF);

        // Destaca o selecionado
        if (this.selectedAvatar === 'avatar_boy') {
            this.avatarBoy.setTint(0xAAAAFF);
        } else if (this.selectedAvatar === 'avatar_girl') {
            this.avatarGirl.setTint(0xFFAAAA);
        }
    }
}
