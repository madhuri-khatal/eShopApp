import {Get} from './AxiosRequester';
export const OrderApi = {
  // My Order List
  getMyOrderList: async () => {
    return await Get<any>('/wp-json/wc/v3/orders');
  },
// orderDetailbyId
getOrderDetailById:async(id:number | string)=>{
  return await Get<any>(`/wp-json/wc/v3/orders/${id}?`);
},

// orderDetailByCuatomerID
getOrderList: async (id: number | string) => {
  return await Get<any>(`/wc-api/v3/customers/${id}/orders?`);
},
 };
