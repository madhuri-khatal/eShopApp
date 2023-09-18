import { Create } from "./AxiosRequester";


export const CustomerApi= {
  // Create Customer
  onCreateCustomerApi: async (json: any) => {
    return await Create<any>(`/wc-api/v3/customers?`, json);
  }
}