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

export const checkoutObject = (
  formData: any,
  line_items: any,
  shipping_lines: any[],
  customerId?: number | string,
  selectedMethod?: string,
  coupon_lines?: string,
) => {
  const shipping = shippingData(formData);
   let couponLinesArray: {code?: string}[] = [];
    couponLinesArray = coupon_lines?.trim() ? [{code: coupon_lines}] : [];
  
  const checkOutData: any = {
    payment_method: selectedMethod || 'cod',
    payment_method_title: selectedMethod || 'cod',
    status: 'processing',
    customer_id: customerId,
    set_paid: true,
    billing: {
      ...formData,
      country: 'IN',
    },

    shipping: {
      ...shipping,
      country: 'IN',
    },
    line_items: line_items,
    shipping_lines: shipping_lines,
    coupon_lines: couponLinesArray,
      };

  return checkOutData;
};
