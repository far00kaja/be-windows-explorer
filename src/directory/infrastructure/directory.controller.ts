import Elysia, { t } from "elysia";

import { createDirectoryUseCase } from "../application/create_directory.usecase";
import { getAllParentDirectoryUseCase } from "../application/getall_directory.usecase";
import { updateDirectoryUseCase } from "../application/update_directory.usecase";
import { deleteByIdDirectoryUseCase } from "../application/deletebyid_directory.usecase";

export const DirectoryController = new Elysia()
  .get(
    "directory",
    async ({ query, set }) => {
      try {
        query.parent = query.parent ?? 0;
        const dirs = await getAllParentDirectoryUseCase(query.parent);
        return {
          message: "success",
          status: 200,
          data: dirs,
        };
      } catch (error) {
        console.log(error);
        set.status = 500;
        return { status: "error", message: "Internal Server Error" };
      }
    },
    {
      query: t.Object({
        parent: t.Optional(t.Number({ default: 0 })),
      }),
    }
  )
  .post(
    "directory",
    async ({ body, set }) => {
      try {
        if (!body.parent) body.parent = 0;
        const dir = await createDirectoryUseCase(body.parent, body.name);
        set.status = dir.code;
        return {
          status: dir.code,
          message: dir.message,
        };
      } catch (error) {
        console.error(error);
        set.status = 500;
        if (error instanceof Error) {
          return { status: "error", message: error.message };
        }
      }
    },
    {
      body: t.Object({
        parent: t.Optional(t.Number()),
        name: t.String(),
      }),
      response: {
        201: t.Object({
          status: t.Number(),
          message: t.String(),
        }),
        500: t.Object({
          status: t.String(),
          message: t.String(),
        }),
      },
    }
  )
  .put(
    "directory",
    async ({ body, set }) => {
      try {
        if (!body.parent) body.parent = 0;
        const dir = await updateDirectoryUseCase(
          body.parent,
          body.name,
          body.id
        );
        set.status = dir.code;
        return {
          status: dir.code,
          message: dir.message,
        };
      } catch (error) {
        console.error(error);
        set.status = 500;
        if (error instanceof Error) {
          return { status: "error", message: error.message };
        }
      }
    },
    {
      body: t.Object({
        parent: t.Number(),
        id: t.Number(),
        name: t.String(),
      }),
      response: {
        201: t.Object({
          status: t.Number(),
          message: t.String(),
        }),
        500: t.Object({
          status: t.String(),
          message: t.String(),
        }),
      },
    }
  )
  .delete(
    "directory/:id",
    async ({ params, set }) => {
      try {
        if (params.id === null) {
          set.status = 400;
          return {
            message: "data not found",
            status: 400,
          };
        }
        const dirs = await deleteByIdDirectoryUseCase(params.id);
        return {
          message: "success",
          status: 200,
        };
      } catch (error) {
        console.log(error);
        set.status = 500;
        return { status: "error", message: "Internal Server Error" };
      }
    },
    {
      params: t.Object({
        id: t.Number({ default: 0 }),
      }),
    }
  );
