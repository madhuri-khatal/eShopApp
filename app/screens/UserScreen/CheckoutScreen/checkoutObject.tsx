const shippingData = (data: any) => {
  const shipping: any = {};
  Object.keys(data).forEach(key => {
    if ('phone' == key || 'email' == key) {
      return;
    }
    shipping[key] = data[key];
  });
  return shipping;
};
// const billingFormat = (data: any) => {
//   const bilingData: any = {};
//   Object.keys(data).forEach((key: string) => {
//     if (key === 'coupon_lines') {
//       return;
//     } else {
//       bilingData[key] = data[key];
//     }
//   });
//   return bilingData;
// };

export const checkoutObject = (
  formData: any,
  line_items: any,
  shipping_lines: any[],
  customerId?: number | string,
  selectedMethod?: string,
  discountedTotalAmount?: number | string[],
) => {
  const shipping = shippingData(formData);
  // const biilingData = billingFormat(formData);
  // const {coupon_lines} = formData;
  return {
    payment_method: selectedMethod || 'cod',
    payment_method_title: selectedMethod || 'cod',
    status: 'processing',
    customer_id: customerId,
    set_paid: true,
    // coupon_lines: coupon_lines,
    // coupon_lines: [`SHGPurvaMadhuri`],
    billing: {
      // ...biilingData,
      ...formData,
      country: 'IN',
    },

    shipping: {
      ...shipping,
      country: 'IN',
    },
    line_items: line_items,
    shipping_lines: shipping_lines,
  };
};
