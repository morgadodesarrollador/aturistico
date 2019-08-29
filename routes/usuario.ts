
import { Router, Request, Response } from 'express';
import { UsuarioModel } from '../models/usuario.model'
import bcrypt from 'bcrypt';
import Token from "../clases/tokens";
import { MDLcheckToken } from "../middleware/autenticacion";

const userRoutes = Router();
//Login
userRoutes.post('/login', (req: Request, res: Response) => {
    //con email/pass, Contiene el objeto del POST
   const body = req.body;
    //buscamos el objeto, en el Modelo de Usuarios (colección),
    // cuyo email sea igual al que llega por POST
   UsuarioModel.findOne({ email: body.email }, (err, userDB) =>{
       if (err) throw err; //err en la bd
       if (!userDB) {      //email no existe
           return res.json({
               ok: false,
               mensaje: 'email/pass no son correctas'
           })
       }
       //el email si existe en la BD, comparamos las contraseñas
       //la pasada por el post en body.password y this.password en el método
       //compararPassword
       if (userDB.compararPassword(body.password)) {
           //email existe y el password es el mismo.
           //creamos el token en base a un payload (campos)
           const tokenUser = Token.getJwtToken({
               _id    : userDB._id,
               nombre : userDB.nombre,
               email  : userDB.email,
               avatar : userDB.avatar
           });
           res.json ({
               ok: true,
               token : tokenUser
           })
       }else {
           //emil existe y password erráneo
           return res.json({
               ok: false,
               mensaje: 'pass no son correctas'
           })
       }

   });
});
//crear usuario
userRoutes.post ('/create', (req:Request, res:Response) => {
    const user = { //info del objeto user del POST a través del body parser
        nombre   : req.body.nombre,
        email    : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10),
        avatar   : req.body.avatar
    };

    UsuarioModel.create( user ) //regresa una Promesa
        .then (userDB => { //caso de insercción OK, respondemos ...
            const tokenUser = Token.getJwtToken({
                _id    : userDB._id,
                nombre : userDB.nombre,
                email  : userDB.email,
                avatar : userDB.avatar
            });

            res.json({
                ok: true,
                user: tokenUser
            })
        }).catch ( err => { //error de la promesa
            res.json ({
                ok: false,
                err
            })
    })


});
//MDLcheckToken es una F.MDLW que se ejecuta antes que /update
// [ fmdlw1, fmdlw2...]
userRoutes.post ('/update', MDLcheckToken, (req:any, res:Response) => {
    res.json({
        ok: true,
        usuario: req.usuario // creado en MDLckeckToken
    })
});

userRoutes.get ('/prueba', (req:Request, res:Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo funciona ok'
    })
});
export default userRoutes;
