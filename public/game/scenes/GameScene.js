import PlayerData from "../PlayerData.js";

const QUESTIONS_PER_PHASE = 5;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });

        this.initialTime = 15;
        this.timerEvent = null;
        this.timerText = null;
        this.feedbackText = null;

        this.consecutiveCorrect = 0;
        this.totalQuestionsAnswered = 0;
        this.optionButtons = [];
        this.heartIcons = [];
    }

    init(data) {
        if (!data || !data.playerData) {
            console.error('PlayerData não foi passado para GameScene!');
            // Cria um PlayerData padrão para evitar crash
            this.playerData = new PlayerData();
        } else {
            this.playerData = data.playerData;
        }
    
        // Define o tempo baseado no nível
        switch (this.playerData.currentLevel) {
            case 1: this.initialTime = 20; break;
            case 2: this.initialTime = 15; break;
            case 3: this.initialTime = 10; break;
            case 4: this.initialTime = 8;  break;
            default: this.initialTime = 15;
        }
    }

    create() {
        const gameWidth = this.sys.game.canvas.width;
        const gameHeight = this.sys.game.canvas.height;
        const centerX = gameWidth / 2;

        this.imageToWordData = this.cache.json.get('imageToWordData');
        this.wordToImageData = this.cache.json.get('wordToImageData');

        this.add.image(centerX, gameHeight / 2, 'clean_background')
        .setOrigin(0.5)
        .setDisplaySize(gameWidth, gameHeight); // ajusta para a tela toda

        // --- HUD ---
        this.scoreText = this.add.text(50, 20, `Pontos: ${this.playerData.score}`, { fontSize: '24px', fill: '#FFF', backgroundColor: '#333' });

        this.add.text(50, 60, `Jogador: ${this.playerData.name} (Nível ${this.playerData.currentLevel})`, {
            fontSize: '18px', fill: '#000', backgroundColor: '#FFF'
        });

        this.updateLifeDisplay();

        this.timerText = this.add.text(centerX, 30, `Tempo: ${this.initialTime}`, { 
            fontSize: '32px', fill: '#FFC107', backgroundColor: '#333', padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        this.questionContainer = this.add.container(centerX, gameHeight / 2);

        this.loadNewQuestion();
    }

    loadNewQuestion() {
        this.questionContainer.removeAll(true);
        this.optionButtons.forEach(btn => btn.destroy());
        this.optionButtons = [];

        if (this.feedbackText) this.feedbackText.destroy();

        this.timeRemaining = this.initialTime;
        this.timerText.setText(`Tempo: ${this.timeRemaining}`);

        if (this.timerEvent) this.timerEvent.remove();

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeRemaining--;
                this.timerText.setText(`Tempo: ${this.timeRemaining}`);
                this.timerText.setFill(this.timeRemaining <= 5 && this.timeRemaining > 0 ? '#FF0000' : '#FFC107');

                if (this.timeRemaining <= 0) {
                    this.timerEvent.remove();
                    this.handleAnswer('TIMEOUT_NO_ANSWER', this.currentQuestion.correct, null);
                }
            },
            loop: true
        });

        const isWordToImage = Phaser.Math.Between(0, 1) === 0;
        const dataSet = isWordToImage ? this.wordToImageData : this.imageToWordData;

        if (!dataSet) {
            console.error('Dados do jogo não encontrados.');
            return;
        }

        this.currentQuestion = Phaser.Utils.Array.GetRandom(dataSet);

        this.displayQuestion(isWordToImage);
        this.displayOptions(isWordToImage);
    }

    updateLifeDisplay() {
        this.heartIcons.forEach(heart => heart.destroy());
        this.heartIcons = [];

        const gameWidth = this.sys.game.canvas.width;
        const startX = gameWidth - 30;
        const spacing = 40;

        for (let i = 0; i < this.playerData.lives; i++) {
            const heart = this.add.image(startX - (i * spacing), 35, 'heart').setScale(0.5);
            this.heartIcons.push(heart);
        }
    }

    displayQuestion(isWordToImage) {
        const q = this.currentQuestion;
        if (isWordToImage) {
            const text = this.add.text(0, -150, q.word.toUpperCase(), { fontSize: '40px', fill: '#1a1a1a', backgroundColor: '#fff', padding: { x: 15, y: 10 } }).setOrigin(0.5);
            this.questionContainer.add(text);
        } else {
            const imageName = q.image.split('/').pop().replace('.png', '').replace('.jpg', '');
            const image = this.add.image(0, -150, imageName).setScale(0.5);
            this.questionContainer.add(image);
        }
    }

    displayOptions(isWordToImage) {
        const q = this.currentQuestion;
        const options = Phaser.Utils.Array.Shuffle(q.options);
        const positions = [{x:-200,y:50},{x:0,y:50},{x:200,y:50}];

        options.forEach((optionValue, index) => {
            const pos = positions[index];
            let displayObject;

            if (isWordToImage) {
                const imageName = optionValue.split('/').pop().replace('.png','').replace('.jpg','');
                displayObject = this.add.image(pos.x,pos.y,imageName).setScale(0.4);
            } else {
                displayObject = this.add.text(pos.x,pos.y, optionValue.toUpperCase(), { fontSize:'28px', fill:'#111', backgroundColor:'#e0e0e0', padding:{x:15,y:10} }).setOrigin(0.5);
            }

            displayObject.setInteractive({useHandCursor:true});
            displayObject.on('pointerdown', () => this.handleAnswer(optionValue, q.correct, displayObject));
            displayObject.on('pointerover', ()=>displayObject.setAlpha(0.7));
            displayObject.on('pointerout', ()=>displayObject.setAlpha(1));

            this.questionContainer.add(displayObject);
            this.optionButtons.push(displayObject);
        });
    }

    handleAnswer(selected, correct, button) {
        if (this.timerEvent) this.timerEvent.destroy();
        if (this.feedbackText) this.feedbackText.destroy();
        this.optionButtons.forEach(btn => btn.disableInteractive());

        if (selected === correct) {
            this.consecutiveCorrect++;
        
            const baseScore = 100;
            const bonus = 50 * (this.consecutiveCorrect-1);
            const gainedScore = baseScore + bonus;
        
            this.playerData.score += gainedScore;
            this.scoreText.setText(`Pontos: ${this.playerData.score}`);
        
            this.feedbackText = this.add.text(400, 450, `Certo! +${gainedScore} pts`, { fontSize: '30px', fill:'#00aa00' }).setOrigin(0.5);
        
            if (button) button.setTint(0x5cb85c);
        
        } else {
            this.playerData.lives--;
            this.consecutiveCorrect = 0;
            this.updateLifeDisplay();
        
            const message = selected==='TIMEOUT_NO_ANSWER' ? 'Tempo Esgotado! -1 Vida':'Errado! -1 Vida';
            this.feedbackText = this.add.text(400,450,message,{fontSize:'30px',fill:'#cc0000'}).setOrigin(0.5);
        
            if (button) button.setTint(0xFF0000);
        }

        if (this.playerData.lives <= 0) {
            this.time.delayedCall(2000, ()=>{
                alert('Você perdeu!');
                this.playerData.resetForNewGame(); // <- aqui
                this.scene.restart({playerData: this.playerData});
            });
            return;
        }

        this.totalQuestionsAnswered++;

        if (this.totalQuestionsAnswered >= QUESTIONS_PER_PHASE) {
            this.time.delayedCall(2000, ()=>{
                this.scene.start('ResultScene', { 
                    playerData: this.playerData,
                    totalQuestionsAnswered: this.totalQuestionsAnswered
                });
            });
            return;
        }

        this.time.delayedCall(2000, this.loadNewQuestion, [], this);
    }
}
