export async function json (req , res) {
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
         req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (error) {
        req.body = null;
    }

    res.setHeader('Content-type','application/json');
}

// COnverte o Json na entrada e devolve em JSON na Saída