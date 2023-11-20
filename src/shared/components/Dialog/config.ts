import { DialogStandard } from "../../../modules/portfolio/ui/dialogs/AddAssetDialog";
import { TopUpPortfolioDialog } from "../../../modules/portfolio/ui/dialogs/TopUpPortfolioDialog";
import { IDialogConfig } from "./interfaces";

export const dialogConfig: IDialogConfig[] = [
  {
    name: "addAsset",
    component: DialogStandard,
    onEnter: () => {
      // console.log("addAsset dialog initialized");
    },
  },
  {
    name: "topUpPortfolio",
    component: TopUpPortfolioDialog,
    onEnter: () => {
      // console.log("topUpPortfolio dialog initialized");
    },
  },
];
