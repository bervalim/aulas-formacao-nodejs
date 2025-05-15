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

    select(table){
        const data = this.#database[table] ?? []
        console.log(this.#database[table])
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

}