import { Directory } from "../domain/directory.type";
import { DirectoryRepository } from "../infrastructure/directory.repository";

export const deleteByIdDirectoryUseCase = async (
  id: number
): Promise<boolean> => {
  const deleted = await DirectoryRepository.delete(id);
  return deleted ? true : false;
  // return await DirectoryRepository.getAll();
};
