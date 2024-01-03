"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const validate_user_creation_middleware_1 = require("../middlewares/validate-user-creation.middleware");
const auth_middleware_1 = require("../../../common/middlewares/auth.middleware");
const UserRoutes = () => {
    const router = (0, express_1.Router)();
    // POST /users
    router.post("/", validate_user_creation_middleware_1.validateUserCreationMiddleware, user_controller_1.default.createUser);
    // GET /users
    router.get("/", user_controller_1.default.listUsers);
    // GET /users/:user_id
    router.get("/by_id/:user_id", user_controller_1.default.findOne);
    // PATCH /users/:user_id
    router.patch("/:user_id", user_controller_1.default.updateUser);
    // DELETE /users/:user_id
    router.delete("/:user_id", user_controller_1.default.deleteUser);
    // POST /users/authenticate
    router.post("/authenticate", user_controller_1.default.authenticate);
    // GET /users/posts
    router.get("/posts", auth_middleware_1.validateJwtUser, user_controller_1.default.listPosts);
    // GET /users/:user_id/posts
    // router.get("/:user_id/posts", UserController.listPostsByUser);
    return router;
};
exports.UserRoutes = UserRoutes;
