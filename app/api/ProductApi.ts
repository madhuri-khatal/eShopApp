import {Get} from './AxiosRequester';
export const ProductApi = {
  getProductList: async () => {
    return await Get<any>('/wp-json/wc/v3/products?per_page=20&');
  },

   // Get perticular Poduct information
   getProductById:async(id:number | string)=>{
    return await Get <any>(`/wp-json/wc/v3/products/${id}`)
  },
  
  // Get product by categoryID
    getProductByCategoryId:async(id:number| string)=>{
    return await Get <any>(`/wp-json/wc/v3/products?category=${id}&per_page=50&`)
  },
 
   // Get particular product information of subCtegory Product
  getProductDetailByCategoryId:async(id:number | string)=>{
    return await Get<any>(`/wp-json/wc/v3/products/categories/${id}`)
  }
  
};
