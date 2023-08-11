import { Get } from "./AxiosRequester";
export const FilterApi = {
  getMainCategory: async () => {
    return await Get<any>("/wp-json/wc/v3/products/categories?parent= 0&");
  },

  getProductSubCategoeriesList: async (id: number | string) =>
    await Get<any>(`/wp-json/wc/v3/products/categories?parent=${id}&`, {
    }),
};
