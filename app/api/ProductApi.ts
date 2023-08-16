import {Get} from './AxiosRequester';
export const ProductApi = {
  getProductList: async () => {
    return await Get<any>('/wp-json/wc/v3/products');
  },

   // Get perticular Poduct information
   getProductById:async(id:number | string)=>{
    return await Get <any>(`/wp-json/wc/v3/products/${id}`)
  }
  
};
