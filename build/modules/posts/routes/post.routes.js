"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const auth_middleware_1 = require("../../../common/middlewares/auth.middleware");
const PostRoutes = () => {
    const router = (0, express_1.Router)();
    // POST /posts
    router.post("/", auth_middleware_1.validateJwtUser, post_controller_1.default.createPost);
    // GET /posts
    router.get("/", post_controller_1.default.listPosts);
    return router;
};
exports.PostRoutes = PostRoutes;
