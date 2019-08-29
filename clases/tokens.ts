
import jwt from 'jsonwebtoken';

//clase estático
export default class Token {
    //usaremos el seed para firmar los tokens
    private static seed: string = 'seed-app-secret';
    private static caducidad: string = '30d';
    constructor() {}

    static getJwtToken (payload: any): string{
        //payload: campos dentro del token (id, mail, username, password, avatar ...)
        return jwt.sign(
            {usuario: payload},
            this.seed,
            { expiresIn: this.caducidad} )
    }
    //método para compara token 4.50
    static comprobarToken (userrToken: string){
        return new Promise( (resolve, reject) => {
            //cuerpo de la promesa
            jwt.verify(userrToken, this.seed, (err, decoded) => {
                if (err){
                    //no confiar
                    reject();
                }else {
                    //token válido.
                    // decoded contiene todos los datos decodificados del token
                    resolve (decoded)
                }
            })
        }
    )}
}
