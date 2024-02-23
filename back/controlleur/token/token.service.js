const Token = require("./../../model/token");
var crypt = require("crypto");

async function analyseToken(tokenValue){
    try {
        if(tokenValue === null){
            throw {name:"error",status:403,message:"FORBIDDEN"};
        }
        let tok = await Token.findOne({token_value:tokenValue});
        if(tok.date_expiration.getTime() < new Date().getTime()){
            throw {name:"error",status:401,message:"AUTH.ERROR.EXPIRED"};
        }
        return tok;
    } catch (error) {
        throw error;
    }
}
exports.analyseToken = analyseToken;

async function nouveauToken(utilisateur){
    try {
        await deleteToken(utilisateur);
        return await createToken(utilisateur);
    } catch (error) {
        throw error;
    }
}
exports.nouveauToken = nouveauToken;

async function deleteToken(utilisateur){
    try {
        let tok = await Token.findOne({utilisateur_id:utilisateur._id});
        if(tok != null){
            await tok.deleteOne();
        }
    } catch (error) {
        throw error;
    }
}

async function createToken(utilisateur){
    try {
        let value = await generateTokenValue(utilisateur);
        let tok = new Token({date_expiration:generateDateExpriration()
            ,token_value:value});
        tok.utilisateur_id = utilisateur;
        return await tok.save();
    } catch (error) {
        throw error;
    }
}

function generateDateExpriration(){
    let date = new Date();
    date.setMinutes(date.getMinutes() + 40);
    return date;
}
async function generateTokenValue(utilisateur){
    let token_value = utilisateur.email + new Date().toLocaleDateString() + new Date().toLocaleTimeString();
    return crypt.createHash("sha256").update(token_value).digest("hex");
}