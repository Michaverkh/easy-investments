import { IAssetsItem } from "../../store/interfaces";

interface IAssetsItemWithChildren extends IAssetsItem {
  children?: IAssetsItemWithChildren[];
}

export const getAssetsWithChildren = (
  assets: IAssetsItemWithChildren[]
): IAssetsItemWithChildren[] => {
  const newAssets = assets.map((item) => {
    return { ...item };
  });

  newAssets.forEach((asset) => {
    if (asset.parent) {
      const targetItem = newAssets.find((item) => item.name === asset.parent);

      if (targetItem) {
        targetItem.children = targetItem.children || [];
        if (
          targetItem.children.findIndex((item) => item.name === asset.name) ===
          -1
        ) {
          targetItem.children.push(asset);
        }
      }
    }
  });

  return newAssets;
};
