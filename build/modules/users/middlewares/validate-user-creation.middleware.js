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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserCreationMiddleware = void 0;
const validateUserCreationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name) {
        return res.status(400).json({ ok: false, message: "Name is required" });
    }
    if (!email) {
        return res.status(400).json({ ok: false, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ ok: false, message: "Password is required" });
    }
    next();
});
exports.validateUserCreationMiddleware = validateUserCreationMiddleware;
