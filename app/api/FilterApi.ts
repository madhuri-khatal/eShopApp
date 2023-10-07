import {Get,GetFeatuare} from './AxiosRequester';
export const FilterApi = {
  getMainCategory: async () => {
    return await Get<any>('/wp-json/wc/v3/products/categories?parent= 0&');
  },

  getProductSubCategoeriesList: async (id: number | string) =>
    await Get<any>(
      `/wp-json/wc/v3/products/categories?parent=${id}&per_page=50&`,
    ),

  getfeaturecategory: async () =>
    await GetFeatuare<any>(`/wp-json/custom/v1/featured-category/12800`),

    getFestival:async()=> await GetFeatuare<any>('/wp-json/custom/v1/festive-image/12873')
};
