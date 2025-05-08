import { Readable}  from "node:stream";
// Iremos simular que estamos enviando uma requisição aos poucos ao nosso backend
class oneToHundredStream extends Readable {
   
    index = 1
    _read() {
        const i = this.index++
        setTimeout(() => {
            if(i > 5) {
                const test = this.push(null)
                console.log('test1',test);
            }else{
                const buffer = Buffer.from(String(i));
                this.push(buffer)
            }
        },1000)
    }
}

// Canal de comunocação se mant^em aberto
// Envio de informação aos poucos

fetch('http://localhost:3334', {
    method:'POST',
    body: new oneToHundredStream(),
    duplex: 'half',
}).then(response => {
    return response.text();
}).then(data => {
    console.log(data);
})
// Fazendo uma requisição para um endpoint de api usando fetch