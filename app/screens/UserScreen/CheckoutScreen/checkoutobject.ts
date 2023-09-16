const shippingData=(data:any)=>{
    const shipping:any={}
    Object.keys(data).forEach(key=>{
        if("phone"==key||"email"==key){
          return
        }
        shipping[key]=data[key]
    })
    return shipping;
}


export const checkoutObject = (formData:any,line_items:any,shipping_lines?:any) => {
   const shipping= shippingData(formData)
    return {
        "payment_method": "cod",
        "payment_method_title": "cod",
        "set_paid": true,
        "billing": {
            ...formData,
            "country": "IN",
           
        },
        "shipping": {
            ...shipping,
            "country": "IN"
        },
        "line_items": line_items,
        "shipping_lines": [
            {
                "method_id": "flat_rate",
                "method_title": "Flat Rate",
                "total": "10.00"
            }
        ]
    }
}