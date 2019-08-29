
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'nombre es obligatorio']
    },
    avatar: {
        type: String,
        default:'av-1.png'
    },
    email: {
        type:String,
        unique: true,
        required: 'El correo es necesario'
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
});

usuarioSchema.method('compararPassword', function(pass:string = ''):boolean {
    if (bcrypt.compareSync (pass, this.password)) {
        return true
    }else{
        return false;
    }
});

interface IUsuario extends Document{
    nombre: string;
    email: string;
    password: string;
    avatar: string;
    compararPassword(password: string): boolean;
}
export const UsuarioModel = model<IUsuario>('Usuario', usuarioSchema);
