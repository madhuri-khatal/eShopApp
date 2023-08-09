import { Get } from "./AxiosRequester";
export const FilterApi = {
  getMainCategory: async () => {
    return await Get<any>("/wp-json/wc/v3/products/categories?parent= 0&");
  },

  getProductCategoeriesList: async (id: number | string) =>
    await Get<any>(`/wp-json/wc/v3/products/categories?parent=${id}&per_page=50`, {
    }),
};
