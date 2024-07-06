export const productJson = [
  {
    id: 1,
    name: "p_name",
    label: "Product Name",
    type: "text",
    placeHolder:"Eg: Rice Powder"
  },
  {
    id: 2,
    name: "price",
    label: "Price",
    type: "number",
    placeHolder:" Original Price Eg:1000"
  },
  {
    id: 3,
    name: "productOffer",
    label: "Product Offer",
    type: "text",
    placeHolder:"Have any offer Eg:10%"
  },
  {
    id: 4,
    name: "quantity",
    label: "Quantity",
    type: "text",
    placeHolder:"Eg: 10"
  },
  {
    id: 5,
    name: "weight",
    label: "Weight ",
    type: "text",
    placeHolder:"Eg: 600"
  },
  {
    id: 6,
    name: "finalPrice",
    label: "Final Price",
    type: "number",
    placeHolder:"Eg: Sale Price"
  },
  {
    id: 7,
    name: "stdShipCharge",
    label: "Standard Shipping Charge",
    type: "number",
    placeHolder:"Standard Shipping Charge per Item"
  },
]


export const couponJson = [
  {
    id: 1,
    name: "couponName",
    label: "Coupon Name",
    type: "text",
    placeHolder:"Coupon Name"
  },
  {
    id: 2,
    name: "couponValue",
    label: "Coupon Value",
    type: "number",
    placeHolder:"Coupon Value"
  },
  
  {
    id: 4,
    name: "minValue",
    label: "Minimum order value",
    type: "number",
    placeHolder:"Minimum order value"
  },
  {
    id: 5,
    name: "maxValue",
    label: "Maximum order value",
    type: "number",
    placeHolder:"Maximum order value"
  },
  {
    id: 3,
    name: "expiryDate",
    label: "Expiry Date",
    type: "date",
    placeHolder:"Expiry Date"
  },
 
]


export const orderStatus = [
  {id:1, value:'processing', label:'Processing'},
  {id:2, value:'billed', label:'Billed'},
  {id:3, value:'packed', label:'Packed'},
  {id:4, value:'shipped', label:'Shipped'},
  {id:5, value:'delivered', label:'Delivered'},
  {id:6, value:'re-funded', label:'Re-funded'},
]