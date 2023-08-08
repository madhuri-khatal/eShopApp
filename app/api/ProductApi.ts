import { Get } from "./AxiosRequester";
export const ProductApi = {
  getProductList: async () => {
    return await Get("/wp-json/wc/v3/products");
  },
};
