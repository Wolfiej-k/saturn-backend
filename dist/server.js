"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor(jupiter, port) {
        this.jupiter = jupiter;
        this.port = port;
        this.app = (0, express_1.default)();
        this.initialize();
        this.routes();
    }
    initialize() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.listen(this.port, () => {
            console.log(`Successfully listening on port ${this.port}`);
        });
    }
    routes() {
        this.app.get('*', (req, res) => {
            console.log(`Get request: ${req.body}`);
            res.send('404: Forbidden');
        });
        this.app.post('/student', (req, res) => {
            console.log(`Post request to /student: ${req.body}`);
            if (this.valid(req.body)) {
                this.jupiter.request({
                    id: req.body.id,
                    password: req.body.password,
                    school: req.body.school,
                    city: req.body.city,
                    state: req.body.state
                }).then((scraper) => __awaiter(this, void 0, void 0, function* () {
                    const student = yield scraper.data();
                    res.send(student.toString());
                }));
            }
            else
                res.send('400: Bad request');
        });
    }
    valid(body) {
        if ('id' in body && 'password' in body && 'school' in body
            && 'city' in body && 'state' in body)
            return true;
        return false;
    }
}
exports.default = Server;
