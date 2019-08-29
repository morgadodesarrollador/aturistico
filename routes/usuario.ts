
import { Router, Request, Response } from 'express';
import { UsuarioModel } from '../models/usuario.model'

const userRoutes = Router();

userRoutes.post ('/create', (req:Request, res:Response) => {
    const user = { //info del objeto user del POST a través del body parser
        nombre   : req.body.nombre,
        email    : req.body.email,
        password : req.body.password,
    };

    UsuarioModel.create( user ) //regresa una Promesa
        .then (userDB => { //caso de insercción OK, respondemos ...
            res.json({
                ok: true,
                user: userDB
            })
        })


});
userRoutes.get ('/prueba', (req:Request, res:Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo funciona ok'
    })
});
export default userRoutes;
