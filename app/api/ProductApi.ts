import {Get} from './AxiosRequester';
export const ProductApi = {
  getProductList: async () => {
    return await Get<any>(
      '/wp-json/wc/v3/products?per_page=10&status=publish&',
    );
  },

  // Pagination
  pagination: async (id: number | string) => {
    return await Get<any>(`/wp-json/wc/v3/products?page=${id}&status=publish&`);
  },

  // Get perticular Poduct information
  getProductById: async (id: number | string) => {
    return await Get<any>(`/wp-json/wc/v3/products/${id}`);
  },

  // Get product by categoryID
  getProductByCategoryId: async (id: number | string) => {
    return await Get<any>(
      `/wp-json/wc/v3/products?category=${id}&per_page=50&status=publish&`,
    );
  },

  // Get particular product information of subCtegory Product
  getProductDetailByCategoryId: async (id: number | string) => {
    return await Get<any>(`/wp-json/wc/v3/products/categories/${id}`);
  },

  getCouponListAll: async () => {
    return await Get<any>(`/wp-json/wc/v3/coupons`);
  },
  // for feture categry
  // not working
  // not working
  // not working
  // not working

  getProductByFeatureCategory: async () => {
    return await Get<any>(
      `wp-json/wc/v3/products?category&per_page=4&status=publish`,
    );
  },
};
