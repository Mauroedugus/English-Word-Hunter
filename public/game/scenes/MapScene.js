// public/game/scenes/MapScene.js

export default class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MapScene' });
    }

    init(data) {
        this.playerData = data.playerData;
    }

    create() {
        // --- NOVO: Obtém as dimensões reais da tela ---
        const gameWidth = this.sys.game.canvas.width;
        const gameHeight = this.sys.game.canvas.height;
        const centerX = gameWidth / 2;
        // ---------------------------------------------

        this.add.image(centerX, gameHeight / 2, 'clean_background')
        .setOrigin(0.5)
        .setDisplaySize(gameWidth, gameHeight); // ajusta para a tela toda
        
        // 1. Exibir Título da Tela (Centralizado)
        this.add.text(centerX, gameHeight * 0.15, `Olá, ${this.playerData.name}! Escolha a Fase:`, { 
            fontSize: '36px', 
            fill: '#FFF', 
            backgroundColor: '#333',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // 2. Exibir Avatar do Jogador no canto (Opcional)
        // Posicionado no canto superior direito
        this.add.image(gameWidth - 50, 50, this.playerData.avatar).setScale(0.3).setOrigin(1, 0); 
        
        // 3. Criar os Botões de Fase (4 Fases)
        // Ajustamos as coordenadas para usar porcentagens da tela (gameWidth/gameHeight)
        const phases = [
            { level: 1, name: 'Fácil (Cores, Animais)', x: centerX - gameWidth * 0.25, y: gameHeight * 0.45 },
            { level: 2, name: 'Intermediário (Objetos, Ações)', x: centerX + gameWidth * 0.25, y: gameHeight * 0.45 },
            { level: 3, name: 'Difícil (Lugares, Adjetivos)', x: centerX - gameWidth * 0.25, y: gameHeight * 0.75 },
            { level: 4, name: 'Super (Tudo + Tempo)', x: centerX + gameWidth * 0.25, y: gameHeight * 0.75 }
        ];

        phases.forEach(phase => {
            // Cria um contêiner para o botão de fase
            const phaseButton = this.add.text(phase.x, phase.y, `Fase ${phase.level}\n${phase.name}`, { 
                fontSize: '24px', 
                fill: '#FFF', 
                backgroundColor: '#007ACC', 
                padding: { x: 20, y: 20 },
                align: 'center'
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true }); 

            // Ação do Clique
            phaseButton.on('pointerdown', () => {
                // Inicia a GameScene, passando os dados do jogador e o Nível da Fase
                this.scene.start('GameScene', { 
                    ...this.playerData,
                    currentLevel: phase.level
                });
            });
            
            // Feedback Visual
            phaseButton.on('pointerover', () => { phaseButton.setBackgroundColor('#005C99'); });
            phaseButton.on('pointerout', () => { phaseButton.setBackgroundColor('#007ACC'); });
        });
    }
}