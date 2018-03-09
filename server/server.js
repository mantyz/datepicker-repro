"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor(prod) {
        this.prod = prod;
        this.app = express_1.default();
        if (prod === 'prod') {
            process.env.NODE_ENV = 'production';
            this.app.set('env', 'production');
        }
    }
    static bootstrap(prod) {
        return new Server(prod);
    }
    config(port) {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
        if (this.app.get('env') === 'production') {
            this.app.get('/*', (req, res, next) => {
                res.sendFile(path_1.default.join(__dirname, '../dist/index.html'));
            });
        }
        this.server = http_1.default.createServer(this.app);
        this.server.listen(process.env.PORT || port, () => {
            const serverPort = this.server.address().port;
            console.log(`Server listening at port ${serverPort}. Express mode ${this.app.get('env')}. NODE_ENV mode ${process.env.NODE_ENV}`);
        });
        this.server.keepAliveTimeout = 60000 * 2;
        if (this.server.address().port !== undefined) {
            return this.app;
        }
        else {
            throw new Error('Error');
        }
    }
}
module.exports = Server;
