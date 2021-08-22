import { IApiStore, RequestParams, ApiResponse } from "./types";

export default class ApiStore implements IApiStore {
  //url GitHub API
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Метод, с помощью которого делается запрос.
  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    const url: string = `${this.baseUrl}/${params.endpoint}`;
    try {
      const response = await fetch(url, params);

      const data = await response.json();

      return {
        success: true,
        data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        data: error,
        status: error.status
      };
    }
  }
}
