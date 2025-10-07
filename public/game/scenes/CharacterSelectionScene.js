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

        this.add.image(centerX, gameHeight / 2, 'clean_background')
        .setOrigin(0.5)
        .setDisplaySize(gameWidth, gameHeight); // ajusta para a tela toda

        // --- Título ---
        this.add.text(centerX, 80, 'Escolha seu Avatar e Nome', { 
            fontFamily: 'Baloo Bhaina',
            fontSize: '36px', 
            fill: '#FFFFFF' 
        }).setOrigin(0.5);

        // Cria input HTML
        const nameInput = this.add.dom(centerX, 180, 'input', {
            type: 'text',
            placeholder: 'Digite seu nome...',
            fontSize: '24px',
            padding: '5px 10px',
            width: '200px',
            textAlign: 'center'
        });

        nameInput.setDepth(1);

        nameInput.addListener('input'); 
        nameInput.on('input', () => {
            this.playerData.name = nameInput.node.value || 'Player';
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

        const buttonText = this.add.text(0, buttonHeight / 2, 'CONTINUAR ', { 
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
            topButton.y = 0;
            buttonText.y = buttonHeight / 2 + 8;
        });

        continueButton.on('pointerup', () => {
            topButton.y = 0;
            buttonText.y = buttonHeight / 2 + 8;

            // Remove input DOM
            nameInput.destroy();

            // Garante que nome e avatar estejam definidos
            if (!this.playerData.name) this.playerData.name = 'Player';
            if (!this.playerData.avatar) this.playerData.avatar = this.selectedAvatar;

            // Passa PlayerData para a próxima cena
            this.scene.start('MapScene', { playerData: this.playerData });
        });

        continueButton.on('pointerover', () => {
            this.tweens.add({
                targets: continueButton,
                scale: 1.05,
                duration: 150,
                ease: 'Power2'
            });
        });

        continueButton.on('pointerout', () => {
            this.tweens.add({
                targets: continueButton,
                scale: 1,
                duration: 150,
                ease: 'Power2'
            });
            topButton.y = 0;
            buttonText.y = buttonHeight / 2;
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
