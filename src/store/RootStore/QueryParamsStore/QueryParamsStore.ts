import { History, Location } from "history";
import { action, makeObservable, observable } from "mobx";
import qs from "qs";

type PrivateFields = "_params";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _history!: History;
  private _location!: Location;

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setParam: action
    });
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setHistory(history: History, location: Location) {
    this._history = history;
    this._location = location;
  }

  setParam(key: string, value: string) {}
}
