import { computed, makeObservable, observable, runInAction } from 'mobx';

export class GlobalErrorCollector {
  constructor() {
    makeObservable<GlobalErrorCollector, '_errors'>(this, {
      _errors: observable,
      errors: computed,
    });
  }

  private _errors: any = [];
  get errors(): any {
    return this._errors;
  }
  setError(error: any) {
    runInAction(() => {
      this._errors = [error, ...this._errors];
    });
  }
}
