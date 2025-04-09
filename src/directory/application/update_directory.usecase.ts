import { DirectoryRepository } from "../infrastructure/directory.repository";
import { response } from "../../shared/common/response";

export const updateDirectoryUseCase = async (
  parent: number,
  name: string,
  id: number
): Promise<response> => {
  try {
    const checkId = await DirectoryRepository.getById(id);
    console.log(checkId);
    if (checkId === undefined) {
      return { code: 404, message: "data not found" };
    }
    const checkDuplicate = await DirectoryRepository.getByName(
      name,
      checkId.parent
    );
    if (checkDuplicate) {
      if (checkDuplicate[0] !== undefined) {
        console.log(checkDuplicate);
        if (checkDuplicate[0].id !== checkId.id)
          return { code: 404, message: "name already exist in this directory" };
      }
      // return { code: 404, message: "data not found" };
    }
    const result = await DirectoryRepository.update({
      id: id,
      name: name,
    });
    console.log(result);
    return {
      code: 201,
      message: "success",
    };
  } catch (error) {
    throw error;
  }
};
