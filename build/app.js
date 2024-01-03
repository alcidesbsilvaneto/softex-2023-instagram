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
exports.startWebServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./modules/users/routes/user.routes");
const post_routes_1 = require("./modules/posts/routes/post.routes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/users", (0, user_routes_1.UserRoutes)());
exports.app.use("/posts", (0, post_routes_1.PostRoutes)());
function startWebServer() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            exports.app.listen(process.env.PORT, () => {
                console.log(`Server listening on port ${process.env.PORT}`);
                resolve(null);
            });
        });
    });
}
exports.startWebServer = startWebServer;
