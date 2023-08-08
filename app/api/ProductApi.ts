// import { Get } from "./AxiosRequester";
// import {consumer_key,consumer_secret} from '@env'
// export const ProductApi={
//     getProductList:async()=>await Get<any>("/wp-json/wc/v3/products")
// }

import { btoa, atob } from 'react-native-quick-base64';
import { Get } from "./AxiosRequester";
import { consumer_key, consumer_secret } from '@env'; // Update the path to your @env import

export const ProductApi = {
  getProductList: async () => {
    return await Get("/wp-json/wc/v3/products");
  },
};
