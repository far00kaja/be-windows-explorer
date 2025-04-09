import { Static, t } from "elysia";

export const DirectorySchema = t.Object({
  id: t.Number(),
  parent: t.Number(),
  name: t.String()
});

export type Directory = Static<typeof DirectorySchema>;
