
export function buildRoutePath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g
   
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    // Route params -> vem depois da URL
    // Interrogação depois dos parênteses -> Caráter opcional -> pode existir
    // ou não na URL
    // .* -> Pegar tudo o que vem depois do ponto de interrogação
   const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`) 
   console.log('pathRegex',pathRegex);

   return pathRegex
}