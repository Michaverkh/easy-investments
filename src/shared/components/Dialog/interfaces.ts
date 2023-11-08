import { FunctionComponent } from "react";

export const OPEN_DIALOG = "openDialog";

export interface IDialogState {
  name: string;
  payload: Record<string, any> | undefined;
}

export type ISubscribeCB = (
  fromState?: IDialogState,
  toState?: IDialogState
) => void;
export type IUnsubscribe = () => void;

export interface IDialogConfig {
  name: string;
  component: FunctionComponent<any>;
  onEnter: (
    fromState?: IDialogState,
    toState?: IDialogState,
    dialog?: IDialog
  ) => void;
  onClose?: (dialog: IDialog) => void;
}

export interface IDialog {
  subscribe: (cb: ISubscribeCB) => IUnsubscribe;
  getDialogsConfig: () => IDialogConfig[];
  getState: () => IDialogState | undefined;
  setState: (name: string, payload: Record<string, any>) => void;
  reset: () => void;
}

export interface IDialogComponentProps {
  id: string;
  open: boolean;
  onClose: () => void;
}
