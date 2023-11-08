import { action, computed, makeObservable, observable } from "mobx";
import { IUserStore } from "./interfaces";

export class UserStore implements IUserStore {
  _loading: boolean = false;

  get isLoading() {
    return this._loading;
  }

  constructor() {
    makeObservable<IUserStore, "_loading">(this, {
      _loading: observable,

      isLoading: computed,

      login: action.bound,
      registration: action.bound,
    });
  }

  async login(): Promise<void> {
    try {
      this._loading = true;
    } finally {
      this._loading = false;
    }
  }

  async registration(): Promise<void> {
    try {
      this._loading = true;
    } finally {
      this._loading = false;
    }
  }
}
