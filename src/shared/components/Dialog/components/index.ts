import { isEqual } from "lodash";
import EventEmitter from "wolfy87-eventemitter";
import {
  IDialog,
  IDialogConfig,
  IDialogState,
  ISubscribeCB,
  OPEN_DIALOG,
} from "../interfaces";

export class Dialog implements IDialog {
  private state?: IDialogState;
  private ee: EventEmitter = new EventEmitter();

  constructor(private config: IDialogConfig[]) {
    this.reset = this.reset.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.getState = this.getState.bind(this);
    this.setState = this.setState.bind(this);
  }

  subscribe(cb: ISubscribeCB) {
    this.ee.addListener(OPEN_DIALOG, cb);

    return (): void => {
      this.ee.removeListener(OPEN_DIALOG, cb);
    };
  }

  getDialogsConfig(): IDialogConfig[] {
    return this.config;
  }

  getState(): IDialogState | undefined {
    return this.state;
  }

  setState(name: string, payload: Record<string, any>): void {
    if (this.state?.name === name && isEqual(this.state?.payload, payload)) {
      return;
    }

    if (!name) {
      this.reset();
      return;
    }

    const fromState = this.state;

    const toState = { name, payload };
    this.state = toState;

    this.getConfigByName(name).onEnter(fromState, toState, this);

    this.ee.emit(OPEN_DIALOG, fromState, toState);
  }

  getConfigByName(name: string): IDialogConfig {
    const index = this.config.findIndex((item) => item.name === name);

    if (index < 0) {
      throw new Error("searched config is not exist");
    }

    return this.config[index];
  }

  reset(): void {
    const index = this.config.findIndex(
      (item) => item.name === this.state?.name
    );
    const configItem = this.config[index];

    if (configItem && configItem?.onClose) {
      configItem.onClose(this);
    }

    this.ee.emit(OPEN_DIALOG, this.state, undefined);
    this.state = undefined;
  }
}
