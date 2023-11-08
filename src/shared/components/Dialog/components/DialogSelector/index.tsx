import { FC, createElement } from "react";
import { useDialogState } from "../../hooks";
import { IDialogComponentProps } from "../../interfaces";

export const DialogSelector: FC = () => {
  const [dialogState, dialog] = useDialogState();

  if (dialogState && dialogState.name) {
    const configItem = dialog
      .getDialogsConfig()
      .find((dialogConfig) => dialogConfig.name === dialogState.name);

    if (!configItem?.component) {
      return null;
    }

    const props: IDialogComponentProps = {
      ...dialogState.payload,
      id: configItem.name,
      open: true,
      onClose: dialog.reset,
    };

    return createElement<IDialogComponentProps>(configItem.component, props);
  }
  return null;
};
