export default class ResultScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ResultScene' });
    }

    init(data) {
        // garante que playerData exista
        this.playerData = data.playerData ?? { name: 'Player', score: 0, currentLevel: 1, lives: 3 };

        // total de perguntas respondidas
        this.totalQuestions = data.totalQuestionsAnswered ?? 0;

        this.finalScore = this.playerData.score;
        this.currentLevel = this.playerData.currentLevel;
        this.livesRemaining = this.playerData.lives;

        // checa se o jogo acabou
        this.isGameOver = this.livesRemaining <= 0;

        // regra de aprovação: respondeu todas as perguntas com pelo menos 1 vida
        this.passedPhase = !this.isGameOver && this.totalQuestions >= 5;

        // UIConfig placeholder
        this.UIConfig = {
            fontSize: { medium: 24, large: 32 },
            colors: { correct: '#00aa00', wrong: '#cc0000', normal: '#ffffff', text: '#ffffff' }
        };
    }

    create() {
        const gameWidth = this.sys.game.canvas.width;
        const gameHeight = this.sys.game.canvas.height;
        const centerX = gameWidth / 2;

        // Título
        this.add.text(centerX, 80, this.isGameOver ? 'GAME OVER' : 'Fase Concluída!', { 
            fontSize: `${this.UIConfig.fontSize.large * 2}px`, 
            fill: this.isGameOver ? this.UIConfig.colors.wrong : this.UIConfig.colors.correct,
            fontFamily: 'Arial Black'
        }).setOrigin(0.5);

        // Informações do jogador
        this.add.text(centerX, 180, `Jogador: ${this.playerData.name}`, { 
            fontSize: `${this.UIConfig.fontSize.medium}px`, 
            fill: this.UIConfig.colors.text
        }).setOrigin(0.5);

        this.add.text(centerX, 250, `Pontuação Total: ${this.finalScore} pontos`, { 
            fontSize: `${this.UIConfig.fontSize.large}px`, 
            fill: this.UIConfig.colors.normal
        }).setOrigin(0.5);

        this.add.text(centerX, 320, `Vidas Restantes: ${this.livesRemaining}`, { 
            fontSize: `${this.UIConfig.fontSize.medium}px`, 
            fill: this.UIConfig.colors.wrong
        }).setOrigin(0.5);

        // Mensagem + botão principal
        let messageText = '';
        let buttonAction;
        let mainButtonText;

        if (this.isGameOver) {
            messageText = 'Você perdeu todas as vidas. Tente novamente!';
            buttonAction = () => this.retryPhase();
            mainButtonText = 'TENTAR NOVAMENTE';
        } else if (this.passedPhase) {
            messageText = `PARABÉNS! Você desbloqueou a Fase ${this.currentLevel + 1}!`;
            buttonAction = () => this.goToNextPhase();
            mainButtonText = `IR PARA FASE ${this.currentLevel + 1}`;
        } else {
            messageText = 'Não foi desta vez. Tente novamente para melhorar sua pontuação.';
            buttonAction = () => this.retryPhase();
            mainButtonText = 'TENTAR NOVAMENTE';
        }

        this.add.text(centerX, 400, messageText, { 
            fontSize: `${this.UIConfig.fontSize.medium + 6}px`, 
            fill: this.UIConfig.colors.text, 
            backgroundColor: '#333',
            padding: { x: 10, y: 10 }
        }).setOrigin(0.5);

        // Botões
        this.createButton(centerX, 520, mainButtonText, buttonAction, this.passedPhase ? this.UIConfig.colors.correct : this.UIConfig.colors.wrong);
        this.createButton(centerX - 200, 520, 'Voltar ao Mapa', () => this.goToMap(), '#9E9E9E');
    }

    createButton(x, y, text, callback, color) {
        const button = this.add.text(x, y, text, { 
            fontSize: `${this.UIConfig.fontSize.medium}px`, 
            fill: '#fff', 
            backgroundColor: color,
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        button.on('pointerdown', callback);
        button.on('pointerover', () => { button.setAlpha(0.8); });
        button.on('pointerout', () => { button.setAlpha(1); });
    }

    goToNextPhase() {
        this.playerData.currentLevel = this.currentLevel + 1;
        this.scene.start('GameScene', { playerData: this.playerData });
    }

    retryPhase() {
        this.playerData.lives = 3;
        this.scene.start('GameScene', { playerData: this.playerData });
    }

    goToMap() {
        this.scene.start('MapScene', { playerData: this.playerData });
    }
}
