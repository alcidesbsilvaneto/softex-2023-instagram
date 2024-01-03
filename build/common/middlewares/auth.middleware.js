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
exports.validateJwtUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_data_source_1 = require("../../services/database/app-data-source");
const user_entity_1 = require("../../modules/users/entities/user.entity");
function validateJwtUser(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Busca o token no cabeçalho authorization
            const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token)
                return res.status(401).json({ message: "No token provided" });
            // Verifica se o token é válido
            const jwtPayload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const { id } = jwtPayload;
            const user = yield app_data_source_1.AppDataSource.getRepository(user_entity_1.User).findOne({
                where: { id },
            });
            if (!user) {
                return res.status(401).json({ message: "Invalid token" });
            }
            res.locals.user = user;
            next();
        }
        catch (error) {
            console.log(error, "error on validateJwtUser");
            return res.status(401).json({ message: "not-possible-to-authenticate" });
        }
    });
}
exports.validateJwtUser = validateJwtUser;
