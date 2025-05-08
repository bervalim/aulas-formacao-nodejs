// Representação de uma memória no espaço no computador
// São armazenados para serem enviados para algum lugar e depois serem removidos
// São muito performáticos
// É mais rápiod ler uma stream por partes em informação binária do que em string
// JS -> Não tinha forma nativa de tratar com dados binários.
// Performatica de uma maneira mais baixo nível
const buf  = Buffer.from('hello');

console.log('buf',buf);

// <Buffer 6f 6b> 6f - 6b -> k
