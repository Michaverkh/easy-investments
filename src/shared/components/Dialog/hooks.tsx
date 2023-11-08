import { useContext, useEffect, useState } from "react";
import { DialogContext } from "../../..";
import { IDialog, IDialogState } from "./interfaces";

export function useDialog(): IDialog {
  return useContext(DialogContext) as IDialog;
}

export function useDialogState(): [IDialogState | undefined, IDialog] {
  const dialog = useContext(DialogContext) as IDialog;

  const [dialogState, setDialogState] = useState<IDialogState | undefined>(
    dialog.getState()
  );

  useEffect(
    (): any =>
      dialog.subscribe((fromState, toState) => {
        setDialogState(toState);
      }),
    []
  );

  return [dialogState, dialog];
}
