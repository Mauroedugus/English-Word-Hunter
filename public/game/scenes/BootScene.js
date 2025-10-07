export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    // Pré-carrega todos os assets globais.
    preload() {
        
        this.load.image('background', 'game/assets/images/title_bg.png');
        this.load.image('clean_background', 'game/assets/images/cbg.png');
        this.load.image('map', 'game/assets/images/map.png');

        // 1. Avatares (Corrigido para .jpg)
        this.load.image('avatar_girl', 'game/assets/avatars/avatar_girl.jpg');
        this.load.image('avatar_boy', 'game/assets/avatars/avatar_boy.jpg');
        
        // 2. Ícones (heart.png parece correto, mas verifique se não deveria ser .jpg)
        this.load.image('heart', 'game/assets/images/heart.png');

        // 3. Imagens de Vocabulário (Corrigido para .jpg, com base na estrutura comum)
        this.load.image('apple', 'game/assets/images/apple.jpg');
        this.load.image('dog', 'game/assets/images/dog.jpg');
        this.load.image('car', 'game/assets/images/car.jpg');
        this.load.image('book', 'game/assets/images/book.jpg');
        this.load.image('sun', 'game/assets/images/sun.jpg');
        this.load.image('cat', 'game/assets/images/cat.jpg');
        this.load.image('banana', 'game/assets/images/banana.jpg');
        this.load.image('bicycle', 'game/assets/images/bicycle.jpg');
        this.load.image('tree', 'game/assets/images/tree.jpg');
        this.load.image('house', 'game/assets/images/house.jpg');

        // 4. JSONs (CAMINHO CRÍTICO)
        // O erro 'Timeout' na rede é causado por esses caminhos. Se o servidor roda
        // a partir de 'public/', o caminho deve estar correto.
        this.load.json('imageToWordData', 'game/data/image_to_words.json');
        this.load.json('wordToImageData', 'game/data/word_to_images.json');
    }

    // Após o carregamento, inicia a próxima cena.
    create() {
        // Verifica se os arquivos JSON foram carregados com sucesso
        const imageToWordData = this.cache.json.get('imageToWordData');
        const wordToImageData = this.cache.json.get('wordToImageData');

        if (!imageToWordData || !wordToImageData) {
            console.error('Erro: Arquivos JSON não carregados corretamente. Verifique os caminhos.');
            this.add.text(400, 300, 'Erro de Carregamento!\nVerifique o console.', { 
                fontSize: '24px', 
                fill: '#ff0000' 
            }).setOrigin(0.5);
            return; // Impede que o jogo continue
        }

        // Adiciona um texto simples para indicar o carregamento
        this.add.text(400, 300, 'Loading Game Assets...', { 
            fontSize: '32px', 
            fill: '#fff', 
            backgroundColor: '#000' 
        }).setOrigin(0.5);

        // Quando o carregamento estiver completo, inicia a Tela Inicial
        this.scene.start('TitleScene');
    }
}
