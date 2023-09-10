import { EAssetsType, IAssetsItems } from "./interfaces";

export class DefaultAssetsTree implements IAssetsItems {
  type = EAssetsType.ASSETS;
  name = "";
  valueInPortfolio = 0;
  factualShare = 0;
  targetShare = 0;
}
