import express from "express";
import { UserRoutes } from "./modules/users/routes/user.routes";
import { PostRoutes } from "./modules/posts/routes/post.routes";

export const app = express();

app.use(express.json());

app.use("/users", UserRoutes());
app.use("/posts", PostRoutes());

export async function startWebServer() {
  return new Promise((resolve) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
      resolve(null);
    });
  });
}
