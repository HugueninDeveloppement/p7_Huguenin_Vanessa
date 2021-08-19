const { verify } = require ('jsonwebtoken')


const validateToken = (req, res, next) =>{
    const accesToken = req.header("accesToken");
    if(!accesToken){
        return res.jon({error:"Vous n'etes pas connecté"})
    }

    try{
        const validToken = verify(accesToken,"keyScret");
        
        req.user = validToken;
        if(validToken){
            return next();
        }
    }catch(err){
        return res.json({error: err})
    }
}

module.exports = {validateToken}