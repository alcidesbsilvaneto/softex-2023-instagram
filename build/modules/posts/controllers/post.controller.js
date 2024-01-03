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
const app_data_source_1 = require("../../../services/database/app-data-source");
const post_entity_1 = require("../entities/post.entity");
class PostController {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestingUser = res.locals.user;
                const { label, image_url } = req.body;
                const post = yield app_data_source_1.AppDataSource.getRepository(post_entity_1.Post).save({
                    label: label,
                    image_url: image_url,
                    user_id: requestingUser.id,
                });
                return res.status(201).send({ ok: true, post });
            }
            catch (error) {
                console.log(error, "Error in createPost");
                return res.status(500).send({ ok: false, error: "error-creating-post" });
            }
        });
    }
    listPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield app_data_source_1.AppDataSource.getRepository(post_entity_1.Post).find({
                    relations: ["user"],
                });
                return res.status(200).send({ ok: true, posts });
            }
            catch (error) {
                console.log(error, "Error in listPosts");
                return res.status(500).send({ ok: false, error: "error-listing-posts" });
            }
        });
    }
}
exports.default = new PostController();
