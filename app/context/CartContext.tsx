import React, {createContext, ReactNode, useContext, useState} from 'react';
import {CartApi} from '../api/CartApi';
import {ToastAndroid} from 'react-native';
interface ICartContext {
  cartItems: any;
  getCartList: () => Promise<void>;
  deleteCartItem: () => Promise<void>;
  isShowDialog: boolean;
  onDeletehowDialog?: (key: string) => void;
  onCancel: () => void;
}
const CartContext = createContext<ICartContext | null>(null);
type CartContextType = {children: ReactNode};
export const CartContextProvider = ({children}: CartContextType) => {
  const [cartItems, setcartItems] = useState<any>();
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [productKey, setProductKey] = useState<string>('');
  // CART ITEM LIST
  const getCartList = async () => {
    const {
      result: {data},
    } = await CartApi.getCartList();
    setcartItems(data);
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

  const value: ICartContext = {
    cartItems,
    getCartList,
    deleteCartItem,
    isShowDialog,
    onDeletehowDialog,
    onCancel,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('Please cart context wrap in to cart context provider!');

  return context;
};
