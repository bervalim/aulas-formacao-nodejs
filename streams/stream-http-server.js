import http from "node:http";
import { Transform}  from "node:stream";

// class InverseNumber extends Transform {
//     _transform(chunk, encoding, callback){
//         const tranformedChunk = Number(chunk.toString()) * -1;
//         console.log('ChunkINverse',tranformedChunk);
//         callback(null, Buffer.from(String(tranformedChunk)));
//     }
// }


const server = http.createServer( async (req,res) => {
    // Precisaremos da informação completa da stream para então conseguir trabalhar com esses dados.
    // Nesse array iremos receber os pedacinhos da stream
    const buffers = []

    // await aguarda cada pedaço da stream ser retornado
    for await (const chunk of req)  {
        // Percorre cada pedacinho a requisição e adiciona ao array de buffers
        // Await -> não ira finalizar enquando todos os dados da stream não forem lidos
        console.log('chunk',chunk)
        buffers.push(chunk)
    }
    // Enquanto a stream não for percorrida por completo, nada abaixo da iteração será executada.

    console.log('buffers',buffers)
    // concat -> une vários pedacinhos em um grande pedaço

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)

    return res.end(fullStreamContent);


    
    // return req
    //     .pipe(new InverseNumber())
    //     .pipe(res);
}

)

server.listen(3334);