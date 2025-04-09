import { DirectoryRepository } from "../infrastructure/directory.repository";

export const getAllParentDirectoryUseCase = async (
  parent: number
): Promise<any> => {
  const dir = await DirectoryRepository.getAllParent(parent);
  const getParent = await DirectoryRepository.getById(parent);
  return {
    detail: dir,
    parent: {
      id: getParent === undefined ? null : getParent.id,
      name: getParent === undefined ? "Master" : getParent.name,
    },
  };
};
