
export class Database {
    // obj, a ideia é que eu possa salvar mais infos além de usuário
    // ex: {users: []
    #database = {}
    // sistema interno de dados privados do node ->#
    // só pode ser acessado por métodos dentro da classe

    select(table){
        const data = this.#database[table] ?? []
        return data;
    }

    insert(table, data){
        //Verificando se já existe um array na tabela do banco de dados
        // Se já existir,insere

        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        console.log("this.database[table]",this.#database[table])
        console.log("database",this.#database)
        console.log("data",[data])

        return data
    }

}