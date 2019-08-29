
import { Request, Response, NextFunction } from 'express';
import Token from "../clases/tokens";


//un middleware es una simple función que recibe la request, la response y el next
//el token lo recibiremos en una propiedad de los headers llamada x-token
//podría recibirse por get, post ...
export const MDLcheckToken = (req: any, res: Response, next: NextFunction) => {

    const userToken = req.get('x-token') || '';
    Token.comprobarToken(userToken)
        .then((decoded: any) => { //decoded son los datos decodificados del tk
            console.log(decoded);
            req.usuario = decoded.usuario; //**
            //el token es válido, llamamos a la  siguiente función
            //la del /update para poder modificar el usuario y una vez check el token
            next();
        })
        .catch( err => {
            //no llamamos al next, enviamos una response
            res.json({
                ok: false,
                mensaje: 'Token inválido'
            })
        })

}
