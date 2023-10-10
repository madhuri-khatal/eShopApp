const shippingData = (data: any) => {
    const shipping_address: any = {};
    Object.keys(data).forEach(key => {
      if ('phone' == key || 'email' == key) {
        return;
      }
      shipping_address[key] = data[key];
    });
    return shipping_address;
  };
  
  export const CustomerObject = (
    formData: any
    // ,couponCode:any
     ) => {
    const shipping_address = shippingData(formData);
    return {
        customer:{
            email:formData?.email,
            first_name:formData?.first_name,
            last_name:formData?.last_name,
            username:`${formData?.first_name} ${formData?.last_name}`,
      billing_address: {
        ...formData,
        country: 'IN',
      },
      shipping_address: {
        ...shipping_address,
        country: 'IN',
      },
      // coupon_lines:[couponCode]
    } 

    };
  };
  