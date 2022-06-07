import db from "./../app/db.js";


export async function validateToken(req,res,next){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ','');
    if(!token) return res.sendStatus(401);
    try{        
        const session = await db.query
        
        next();

    }catch(e){
        console.error("token ",e);
        res.send("Error checking token")
    }        
}