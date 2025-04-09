import { eq } from "drizzle-orm";
import { db } from "../../../db/client";
import { mDirectory } from "../../../db/schema";
import sql from "../../shared/infrastructure/db";
import { sql as sqlDrizzle } from "drizzle-orm";
// import { Directory } from "../domain/directory.type";

export interface DirectoryRecord {
  id: number;
  parent: number | null;
  name: string;
  status: boolean | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface CreateDirectoryParams {
  parent: number | null;
  name: string;
}
export interface UpdateDirectoryParams {
  id: number;
  name: string;
}

export class DirectoryRepository {
  static async create(dir: CreateDirectoryParams): Promise<DirectoryRecord> {
    if (dir.parent === 0) dir.parent = null;
    return sql.begin(async (transaction) => {
      const [newDirectory] = await transaction<DirectoryRecord[]>`
          INSERT INTO  m_directory (parent, name)
          VALUES (${dir.parent}, ${dir.name})
          RETURNING *
        `;
      return newDirectory;
    });
  }

  static async getAllParent(parent: number | null): Promise<any[]> {
    let allDirs: DirectoryRecord[];
    let parentDirs: DirectoryRecord[];
    let parentDir: string;
    let parentName: string;
    if (parent === 0) parent = null;
    if (parent === null) {
      allDirs = await db.select().from(mDirectory);
      parentDir = "Master";
    } else {
      allDirs = await db
        .select()
        .from(mDirectory)
        .where(sqlDrizzle`${mDirectory.parent} = ${parent}`);
      parentDirs = await db
        .select()
        .from(mDirectory)
        .where(sqlDrizzle`${mDirectory.id} = ${parent}`)
        .limit(1);
      parentName = parentDirs[0].name;
    }

    type DirWithChildren = DirectoryRecord & {
      children: DirWithChildren[];
      parentName: string;
    };
    function buildDirTree(
      dirs: DirectoryRecord[],
      parent: number | null = null
    ): DirWithChildren[] {
      return dirs
        .filter((dir) => {
          return dir.parent === parent;
        })
        .map((dir) => ({
          ...dir,
          children: buildDirTree(dirs, dir.id),
          parentName: dir.parent === null ? "Master" : parentName,
          // children: buildDirTree(dirs, parent),
        }));
    }
    const nestedDirTree = buildDirTree(allDirs, parent);
    return nestedDirTree;
  }

  static async getById(id: number): Promise<DirectoryRecord | undefined> {
    const [result] = await sql<DirectoryRecord[]>`
    SELECT d.* FROM m_directory d WHERE d.id= ${id} and STATUS=TRUE
    ORDER BY d.name ASC`;
    return result;
  }

  static async getByName(
    name: string,
    parent: number | null
  ): Promise<DirectoryRecord[] | undefined> {
    let dir;
    if (parent === null) {
      [dir] = await sql<DirectoryRecord[]>`
      SELECT d.*
      FROM m_directory d
      WHERE d.parent is NULL AND d.name = ${name}
    `;
    } else {
      [dir] = await sql<DirectoryRecord[]>`
      SELECT d.*
      FROM m_directory d
      WHERE d.parent = ${parent} AND d.name = ${name}
    `;
    }
    return [dir];
  }

  static async update(
    directory: UpdateDirectoryParams
  ): Promise<DirectoryRecord | undefined> {
    return sql.begin(async (transaction) => {
      const [updateDirectory] = await transaction<DirectoryRecord[]>`
        UPDATE m_directory
        SET 
          name = ${directory.name},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${directory.id}
        RETURNING *
      `;

      if (!updateDirectory) {
        return undefined;
      }

      return updateDirectory;
    });
  }
  static async delete(id: number): Promise<DirectoryRecord | undefined> {
    return sql.begin(async (transaction) => {
      const [updateDirectory] = await transaction<DirectoryRecord[]>`
      UPDATE m_directory
      SET 
        status = FALSE,
        updated_at = CURRENT_TIMESTAMP
      WHERE parent = ${id} or id = ${id}
      RETURNING *
    `;
      return updateDirectory;
    });
  }
}
