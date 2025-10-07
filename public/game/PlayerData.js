export default class PlayerData {
    constructor() {
        this.name = "";
        this.avatar = "";
        this.score = 0;
        this.lives = 3;
        this.currentLevel = 1;
        this.unlockedLevels = [1];
    }

    resetForNewGame() {
        this.score = 0;
        this.lives = 3;
        this.currentLevel = 1;
    }
}