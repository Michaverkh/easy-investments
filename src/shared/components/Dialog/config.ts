import { DialogStandard } from ".";
import { IDialogConfig } from "./interfaces";

export const dialogConfig: IDialogConfig[] = [
  {
    name: "addAsset",
    component: DialogStandard,
    onEnter: () => {
      console.log("addAsset dialog initialized");
    },
  },
  {
    name: "showInfo",
    component: DialogStandard,
    onEnter: () => {
      console.log("showInfo dialog initialized");
    },
  },
];
