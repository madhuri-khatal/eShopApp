export default interface Response<T> {
    result?: T;
    err?: Array<string>;
    status?: number;
    cancelled?: boolean;
  }
  export interface ApiValidationErrorResponse {
    keyword: string;
    dataPath: string;
    schemaPath: string;
    params: Object;
    message: string;
  }