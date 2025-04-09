import { check } from "drizzle-orm/gel-core";
import { Directory } from "../domain/directory.type";
import { DirectoryRepository } from "../infrastructure/directory.repository";
import { response } from "../../shared/common/response";

export const createDirectoryUseCase = async (
  parent: number | null,
  name: string
): Promise<response> => {
  try {
    if (parent === 0) parent = null;
    const checkDuplicate = await DirectoryRepository.getByName(name, parent);

    if (checkDuplicate) {
      if (checkDuplicate[0] !== undefined)
        return { code: 400, message: "data already exist" };
    }
    const result = await DirectoryRepository.create({ parent, name });

    return {
      code: 201,
      message: "success",
    };
  } catch (error) {
    throw error;
  }
};
