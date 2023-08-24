
import { Get, Post } from "./AxiosRequester";
export const CartApi = {
  // Add Cart
  createCart: async(json: any)=>
 {await Post<any>('/wp-json/wc/store/cart/add-item?',json)}
  ,
  // Cart List
  getCartList: async () => {
    return await Get<any>("/wp-json/wc/store/cart?");
  },
  // Delete CartItem
  deleteCartItem:async(json:any)=>{
    return await Post<any>(`/wp-json/wc/store/cart/remove-item?`,json)
  }
}
