// /users/:id -> path
export function buildRoutePath(path){
    // Queremos encontrar textos que começam com : e que possuem letras
    // de A a Z
    const routeParametersRegex = /:([a-zA-Z]+)/g
    // com o replace all, encontramos os lugares onde
    // existem parâmetros dinâmicos
    //$1, faz com que possamos nomear parâmetros  e trata-los como uma variável
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')


   
    // ^->A string deve começar exatamente com o que vem a seguir
   const pathRegex = new RegExp(`^${pathWithParams}`) 
   console.log('pathRegex',pathRegex);

   return pathRegex
}