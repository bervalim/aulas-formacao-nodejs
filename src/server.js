import http from "node:http"

// CommonJS -> Padrão de IMportação usndo Require
// criar usuário (name,email.phone -> req)
// JSON - JavaScript Object Notation

const users = [];

const server = http.createServer((req, res) => {
    const { method, url } = req 

    if (method == 'GET' && url =="/users") {
        // Early Return (Se bater aqui, nada abaixo será executado)
        return res.end(JSON.stringify(users))
    }

    if (method == 'POST' && url =="/users") {
        users.push({
            name: 'Fuladno',
            email:'bernardo@email.com',
            id:1
        })
        return res.end('Criação de Usuários')
    }
   
    return res.end('Hello WOrkd 24')
})

server.listen(3333)

// localhost:3333