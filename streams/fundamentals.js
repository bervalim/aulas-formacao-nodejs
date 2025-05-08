
import { Readable, Transform, Writable} from "node:stream";

class oneToHundredStream extends Readable {
    // Método obrigatório das streams de leitura
    // Vai retornar os dados dessa stream
    // proprosito -> enviar dados
    index = 1
    _read() {
        const i = this.index++

        setTimeout(() => {
            if(i > 100) {
                // push _> mpetodo para fornecer informações para quem estiver consumindo a stream
                // Ao inserir o null, dizemos que não temos mais informações para serem enviadas para essa stream
                const test = this.push(null)
                console.log('test1',test);
            }else{
                // Convertendo i para buffer
                // Buffer não aceita números,apenas string
                const buffer = Buffer.from(String(i));
                // Se não chegou a 100,f enviamos o i de dentro da nossa stream
                this.push(buffer)
            }
        },1000)
    }
}

// Stream de Transformação:
// Transforma um dado( chunk em outro)
class InverseNumber extends Transform {
    _transform(chunk, encoding, callback){
        const tranformedChunk = Number(chunk.toString()) * -1;
        // É necessário converter para BUffer novamente
        console.log('ChunkINverse', Number(chunk.toString()));
        callback(null, Buffer.from(String(tranformedChunk)));
    }
}

class MultiplyByTen extends Writable {
    // Métodoobrigatorio:
    // chunk -> pedaço de leitura. O que é enviado ao this.push, POdemos le-lo dentro da stream de escrita
    // callback -> função que deve ser chamada quando a stream de escrita terminou o que deveria fazer
    // Stream de Escrita -> APenas processa o dado, nõa faz transformação
    _write(chunk, encoding, callback){
        // Esse chunk vem da stream de leitura. é um buffer
        console.log('chunk',chunk);
        console.log(Number(chunk.toString()) * 10)
        // ENcerra a execução
        callback()
    }
}

new oneToHundredStream()
.pipe(new InverseNumber())
.pipe(new MultiplyByTen())



