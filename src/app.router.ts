import Elysia from "elysia";
import { response } from "./shared/common/response";
import sql from "./shared/infrastructure/db";
import { DirectoryController } from "./directory/infrastructure/directory.controller";

const router = new Elysia({ prefix: "api/v1" });
router.get("", async () => {
  return {
    test: "test",
  };
});
export interface UserRecord {
  id: number;
  username: string;
  email: string;
  password_hash?: string;
  created_at: Date;
  updated_at: Date;
}
router.get("ping", async ({ set }) => {
  try {
    const [user] = await sql<UserRecord[]>`
    SELECT username
    FROM m_user
    limit 1
  `;
    return {
      message: "db connect",
      status: "success",
    };
    return user;
  } catch (error: any) {
    set.status = 500;
    console.log(error);
    return {
      message:
        error.name === "PostgresError"
          ? "database error"
          : "internal server error",
      status: "failed",
    };
  }
});
router.use(DirectoryController)
// router.group("/folder", (app) =>
//   app.get("", async ({ set }) => {
//     let response: response;
//     try {
//       response = {
//         code: 200,
//         message: "success",
//         data: { test: "test" },
//       };
//     } catch (error) {
//       set.status = 500;
//       response = {
//         code: 500,
//         message: "failed",
//       };
//     }
//     return response;
//   })
// );

export { router };
