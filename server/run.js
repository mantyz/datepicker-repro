"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const argv = process.argv.slice(2);
const port = +argv[0];
const env = argv[1];
(() => {
    try {
        server_1.default.bootstrap(env || 'prod').config(port || 3000);
    }
    catch (err) {
        console.error(`Start error: ${err.stack}`);
    }
})();
