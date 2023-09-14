import {Create, Get, Post} from './AxiosRequester';
export const CartApi = {
  // Add Cart
  addToCart: async (json: any) =>
    await Create<any>(`/wp-json/wc/store/cart/add-item?`, json),
  // Cart List
  getCartList: async () => {
    return await Get<any>('/wp-json/wc/store/cart?');
  },
  // Delete CartItem
  deleteCartItem: async (json: any) => {
    return await Post<any>(`/wp-json/wc/store/cart/remove-item?`, json);
  },

  // Variation wise Price
  setVariationWisePrice: async (id: number | string) => {
    return await Get<any>(`/wp-json/wc/v3/products/${id}/variations?`);
  },

  // Create Order
  onCreateOrderApi: async (json: any) => {
    return await Create<any>(`/wp-json/wc/v3/orders/`, json);
  },
};
