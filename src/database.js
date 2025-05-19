import fs from "node:fs/promises"



const databaseFilePath = new URL('../db.json',import.meta.url)


export class Database {
    #database = {}

    constructor(){
        fs.readFile(databaseFilePath,'utf8').then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist
        } )
    }
    #persist(){
        fs.writeFile(databaseFilePath, JSON.stringify(this.#database))
    }

    // Object.ENtries 
    // {"name": "bernardo", email:"bernardo"}
    // [['name', 'bernardo'], ['email','bernardo']]
    select(table, search){
        let data = this.#database[table] ?? []
        console.log('data',data)
        console.log('search',search);
        // Search é um objeto
        if(search) {
            data = data.filter(row => {
                // Convertendo em um array
                // precisamos percorre-lo com alguma estrutura de repetição
                // Desestruturando usando chave e valor:
                return Object.entries(search).some(([key,value])=> {
                    // Includes -> retorna true se o valor passado estiver incluso no array
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
        return data;
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

      
        this.#persist()

        return data
    }

    delete(table,id){
        // Caso exista um registro no banco com o mesmo id do req.params
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        // Caso o índice não seja encontrado,retorna -1
        if(rowIndex > -1){
            this.#database[table].splice(rowIndex,1)
            this.#persist()
        }

        
    }

    update(table,id, data){
        // Caso exista um registro no banco com o mesmo id do req.params
        const rowIndex = this.#database[table].findIndex(row => row.id === id)


        // Caso o índice não seja encontrado,retorna -1
        if(rowIndex > -1){
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist()
        }

        
    }

}