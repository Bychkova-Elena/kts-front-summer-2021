import ApiStore from "./ApiStore";
import QueryParamsStore from "./QueryParamsStore";

const BASE_URL: string = "https://api.github.com";

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly _apiStore = new ApiStore(BASE_URL);
}
