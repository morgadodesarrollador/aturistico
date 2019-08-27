"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./clases/Server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const server = new Server_1.default();
server.app.use('/user', usuario_1.default);
server.start(() => {
    console.log(`Servidor ejecutandose en ${server.port} `);
});
