
import { Schema, model, Document } from 'mongoose';

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

interface IUsuario extends Document{
    nombre: string;
    email: string;
    password: string;
    avatar: string;
}
export const UsuarioModel = model<IUsuario>('Usuario', usuarioSchema);
