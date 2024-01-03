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
const app_data_source_1 = require("../../../services/database/app-data-source");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const post_entity_1 = require("../../posts/entities/post.entity");
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, bio } = req.body;
            try {
                const user = yield app_data_source_1.AppDataSource.getRepository(user_entity_1.User).save({
                    name: name,
                    email: email,
                    password_hash: bcrypt_1.default.hashSync(password, 8),
                    bio: bio,
                });
                console.log(`User ${user.id} created`);
                res.status(201).json({ ok: true, message: "Usuário criado com sucesso" });
            }
            catch (error) {
                console.log(error, "Error in createUser");
                return res.status(400).json({ message: "Erro ao criar usuário" });
            }
        });
    }
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield app_data_source_1.AppDataSource.getRepository(user_entity_1.User).find({
                    select: ["id", "name", "bio", "followers_count", "followers_count"],
                });
                return res.status(200).json({ ok: true, users });
            }
            catch (error) {
                console.log(error, "Error in listUsers");
                return res.status(400).json({ message: "Erro ao listar usuários" });
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield app_data_source_1.AppDataSource.getRepository(user_entity_1.User).findOne({
                    select: ["id", "name", "bio", "followers_count", "followers_count"],
                    where: { id: +req.params.user_id },
                });
                return res.status(200).json({ ok: true, user });
            }
            catch (error) {
                console.log(error, "Error in findOne");
                res.status(500).send({ ok: false, error: "error-findind-user" });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, bio } = req.body;
                const user = yield app_data_source_1.AppDataSource.getRepository(user_entity_1.User).findOne({
                    where: { id: +req.params.user_id },
                });
                if (!user) {
                    return res.status(404).json({ ok: false, error: "user-not-found" });
                }
                if (name)
                    user.name = name;
                if (bio)
                    user.bio = bio;
                yield app_data_source_1.AppDataSource.getRepository(user_entity_1.User).save(user);
                console.log(`User ${user.id} updated`);
                return res.status(200).json({ ok: true, user });
            }
            catch (error) {
                console.log(error, "Error in updateUser");
                res.status(500).send({ ok: false, error: "error-updating-user" });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield app_data_source_1.AppDataSource.getRepository(user_entity_1.User).findOne({
                    where: { id: +req.params.user_id },
                });
                if (!user) {
                    return res.status(404).json({ ok: false, error: "user-not-found" });
                }
                yield app_data_source_1.AppDataSource.getRepository(user_entity_1.User).softDelete(user);
                console.log(`User ${user.id} deleted`);
                return res
                    .status(200)
                    .json({ ok: true, message: "Usuário deletado com sucesso" });
            }
            catch (error) {
                console.log(error, "Error in deleteUser");
                res.status(500).send({ ok: false, error: "error-deleting-user" });
            }
        });
    }
    listPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestingUser = res.locals.user;
                console.log(requestingUser, "requestingUser");
                const posts = yield app_data_source_1.AppDataSource.getRepository(post_entity_1.Post).find({
                    where: { user_id: requestingUser.id },
                });
                return res.status(200).json({ ok: true, posts: posts });
            }
            catch (error) {
                console.log(error, "Error in listPosts");
                res.status(500).send({ ok: false, error: "error-listing-posts" });
            }
        });
    }
    listPostsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield app_data_source_1.AppDataSource.getRepository(user_entity_1.User).findOne({
                    where: { id: +req.params.user_id },
                });
                if (!user) {
                    return res.status(404).json({ ok: false, error: "user-not-found" });
                }
                const posts = yield app_data_source_1.AppDataSource.getRepository(post_entity_1.Post).find({
                    where: { user_id: user.id },
                });
                return res.status(200).json({ ok: true, posts: posts });
            }
            catch (error) {
                console.log(error, "Error in listPostsByUser");
                res.status(500).send({ ok: false, error: "error-listing-posts" });
            }
        });
    }
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Coletando os dados do req.body
                const { email, password } = req.body;
                // Buscando usuário pelo email
                const user = yield app_data_source_1.AppDataSource.getRepository(user_entity_1.User).findOne({
                    where: { email: email },
                    select: ["id", "name", "email", "password_hash"],
                });
                // Se não encontrar usuário com este email, retorne erro
                if (!user) {
                    return res.status(404).json({ ok: false, error: "user-not-found" });
                }
                // Compara senha enviada no req.body com o hash armazenado
                if (!bcrypt_1.default.compareSync(password, user.password_hash)) {
                    return res.status(401).json({ ok: false, error: "invalid-password" });
                }
                // Gera token JWT
                const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
                // Retorna o token para o usuário
                return res.status(200).json({ ok: true, token });
            }
            catch (error) {
                console.log(error, "Error in authenticate");
                res.status(500).send({ ok: false, error: "error-authenticating-user" });
            }
        });
    }
}
exports.default = new UserController();
