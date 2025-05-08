import http from "node:http"
import { json } from "./middlewares/json.js";

// CommonJS -> Padrão de IMportação usndo Require
// criar usuário (name,email.phone -> req)
// JSON - JavaScript Object Notation

const users = [];

const server = http.createServer(async (req, res) => {
    const { method, url } = req 
    
   

  
    // Porém, está vindo comoo texto
    // Deve ter um await, pois precisamos aguardar essa função ser executada
    // para que o resto do código também seja executado
   
    await json(req,res);
 

    if (method == 'GET' && url =="/users") {
        return res
                .end(JSON.stringify(users));
    }
    

    if (method == 'POST' && url =="/users") {
        const { name , email} = req.body;
        users.push({
            name,
            email,
            id:1
        })
        return res.writeHead(201).end();
    }
   
    return res.writeHead(404).end();
})

server.listen(3333)

// localhost:3333