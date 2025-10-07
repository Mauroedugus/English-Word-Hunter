// public/game/scenes/TitleScene.js

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        const gameWidth = this.sys.game.canvas.width; // <-- Use .canvas.width
        const gameHeight = this.sys.game.canvas.height; // <-- Use .canvas.height
        const centerX = gameWidth / 2;

        this.add.image(centerX, gameHeight / 2, 'background')
        .setOrigin(0.5)
        .setDisplaySize(gameWidth, gameHeight); // ajusta para a tela toda

        // Título do Jogo
        this.add.text(centerX, gameHeight * 0.3, 'WORD HUNTER', { 
            fontSize: '70px', 
            fill: '#333', 
            fontFamily: 'Baloo Bhaina'
        }).setOrigin(0.5); // setOrigin(0.5) centraliza o ponto de âncora do texto

        // Subtítulo
        this.add.text(centerX, gameHeight * 0.45, 'Aprenda Inglês de forma divertida!', { 
            fontSize: '24px', 
            fill: '#333',
            fontFamily: 'Baloo Bhaina' 
        }).setOrigin(0.5);

        // Botão "COMEÇAR"
        const buttonWidth = 400;
        const buttonHeight = 120;
        const buttonY = gameHeight * 0.5;

        const startButton = this.add.container(centerX, buttonY);

        const shadow = this.add.graphics();
        shadow.fillStyle(0x0088AD);
        shadow.fillRoundedRect(-buttonWidth / 2, 8, buttonWidth, buttonHeight, 40);
        
        const topButton = this.add.graphics();
        topButton.fillStyle(0x00B2E3);
        topButton.fillRoundedRect(-buttonWidth / 2, 0, buttonWidth, buttonHeight, 40);
        
        const buttonText = this.add.text(0, buttonHeight / 2, 'COMEÇAR ', {
            fontFamily: 'Baloo Bhaina',
            fontSize: '36px',
            fill: '#FFF',
            fontStyle: '700'
        }).setOrigin(0.5, 0.5).setShadow(2, 2, '#000', 2, true, true);
        
        startButton.add([shadow, topButton, buttonText]);
        startButton.setInteractive(new Phaser.Geom.Rectangle(-buttonWidth / 2, 0, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });

        // Interações
        startButton.on('pointerdown', () => {
            topButton.y = 8;
            buttonText.y = buttonHeight / 2 + 8;
        });

        startButton.on('pointerup', () => {
            topButton.y = 0;
            buttonText.y = buttonHeight / 2;
            this.scene.start('CharacterSelectionScene'); 
        });

        startButton.on('pointerover', () => {
            this.tweens.add({
                targets: startButton,
                scale: 1.05,
                duration: 150,
                ease: 'Power2'
            });
        });

        startButton.on('pointerout', () => {
            this.tweens.add({
                targets: startButton,
                scale: 1,
                duration: 150,
                ease: 'Power2'
            });
            topButton.y = 0;
            buttonText.y = buttonHeight / 2;
        });

    }
}