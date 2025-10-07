//Rota para buscar imagens via API Unsplash ou similar

// routes/images.js
async function carregarPalavrasENivel(nivel) {
    const res = await fetch(`http://localhost:3000/api/words/generate?nivel=${nivel}`);
    const opcoes = await res.json(); // [{ palavra, imagem }, ...]
  
    // Exemplo: mostrar imagens no jogo
    opcoes.forEach(({ palavra, imagem }, i) => {
      this.load.image(`palavraImg${i}`, imagem);
    });
    this.load.once("complete", () => {
      opcoes.forEach(({ palavra }, i) => {
        this.add.image(150 + i * 200, 300, `palavraImg${i}`).setInteractive();
        // aqui você adiciona a lógica para detectar clique e validar a resposta
      });
    });
    this.load.start();
  } 