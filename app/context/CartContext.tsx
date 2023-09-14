import React, {createContext, ReactNode, useContext, useState} from 'react';
import {CartApi} from '../api/CartApi';
import {ToastAndroid} from 'react-native';
import {useProductContext} from './ProductContext';
import {OrderApi} from '../api/OrderApi';
interface ICartContext {
  cartItems: any;
  myOrderItems: any;
  getCartList: () => Promise<void>;
  getMyOrderData: () => Promise<void>;
  deleteCartItem: () => Promise<void>;
  isShowDialog: boolean;
  onDeletehowDialog?: (key: string) => void;
  onCancel: () => void;
  variations: number[];
  quantity: number;
  setvariation: React.Dispatch<React.SetStateAction<number[]>>;
  setQuantity: React.Dispatch<React.SetStateAction<number | undefined>>;
  addToCart: (id: number, quantity: number) => Promise<void>;
  weight: string | number;
  variation: string | number;
  onselectVariationOrWeight: (
    weight: number | string,
    variation: number | string,
  ) => void;
  variationPrice: any;
  setVariationWisePrice: (productById: number | string) => Promise<void>;
}
const CartContext = createContext<ICartContext | null>(null);
type CartContextType = {children: ReactNode};
export const CartContextProvider = ({children}: CartContextType) => {
  const [cartItems, setcartItems] = useState<any>();
  const [myOrderItems, setMyOrderItems] = useState<any>();
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [productKey, setProductKey] = useState<string>('');
  const [variations, setvariation] = useState<number[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const {productById} = useProductContext();

  const [weight, setWeight] = useState<number | string>('');
  const [variation, setVariation] = useState<number | string>('');
  const [variationPrice, setVariationPrice] = useState<any>([]);
  //
  const onselectVariationOrWeight = (
    weight: number | string,
    variation: number | string,
  ) => {
    setWeight(weight);
    setVariation(variation);
  };

  async function addToCart(id: number, quantity: number) {
    const {
      result,
      // : {
      //   data: {data},
      // },
    } = await CartApi.addToCart({
      id: variation,
      quantity: quantity,
    });

    getCartList();
  }
  // CART ITEM LIST
  const getCartList = async () => {
    const {
      result: {data},
    } = await CartApi.getCartList();
    setcartItems(data);
  };

  // My Order List
  const getMyOrderData = async () => {
    const {
      result: {data},
    } = await OrderApi.getMyOrderList();
    setMyOrderItems(data);
  };

  const setVariationWisePrice = async (id: number | string) => {
    const {
      result: {data},
    } = await CartApi.setVariationWisePrice(id);
    setVariationPrice(data);
    // setVariationPrice(data?.map((item: any) => item?.price)?.reverse());
  };

  // DELETE CART ITEM
  const deleteCartItem = async () => {
    const {
      result: {
        data: {items},
      },
    } = await CartApi.deleteCartItem({key: productKey});
    setIsShowDialog(false);
    await getCartList();
    ToastAndroid.showWithGravity(
      'Product are deleted succesfully!!!!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    if (items.some((item: any) => item.key === productKey)) {
    }
  };

  //   Delete Product Dialog Modal
  const onDeletehowDialog = (key: string) => {
    setProductKey(key);
    setIsShowDialog(true);
  };

  //  cancle Delete Product Dialog Modal
  const onCancel = () => {
    ToastAndroid.showWithGravity(
      'Product Not Delete',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    setProductKey('');
    setIsShowDialog(false);
  };

  const value: ICartContext = {
    cartItems,
    getCartList,
    deleteCartItem,
    isShowDialog,
    onDeletehowDialog,
    onCancel,
    variations,
    quantity,
    setvariation,
    setQuantity,
    addToCart,
    variation,
    weight,
    onselectVariationOrWeight,
    variationPrice,
    setVariationWisePrice,
    getMyOrderData,
    myOrderItems,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('Please cart context wrap in to cart context provider!');

  return context;
};
