import * as crypto from "crypto-js";

export class AuthToken {
    secret = 'SnnfQ4g3h63i8S8JiSxHq8TYfef4Sg'
    constructor() {

    }
    encrypt(text: string): string {
        return Buffer.from(crypto.AES.encrypt(text,this.secret).toString()).toString("base64")
    }

    decrypt(text: string): string {
        const textoDecodificado = Buffer.from(text, 'base64').toString('utf-8');

        try{
            var bytes  = crypto.AES.decrypt(textoDecodificado,this.secret);
            return bytes.toString()?JSON.parse(bytes.toString(crypto.enc.Utf8)):"";
        }catch(error){
            return "";
        }
      }

    encryptSHA256(text: string) {
        return crypto.SHA256(text).toString();
    }
}