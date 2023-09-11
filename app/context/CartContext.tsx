import React, {createContext, ReactNode, useContext, useState} from 'react';
import {CartApi} from '../api/CartApi';
import {ToastAndroid} from 'react-native';
import { useProductContext } from './ProductContext';
interface ICartContext {
  cartItems: any;
  getCartList: () => Promise<void>;
  deleteCartItem: () => Promise<void>;
  isShowDialog: boolean;
  onDeletehowDialog?: (key: string) => void;
  onCancel: () => void;
  variations: number[]
  quantity: number | undefined
  setvariation: React.Dispatch<React.SetStateAction<number[]>>
  setQuantity: React.Dispatch<React.SetStateAction<number | undefined>>
  addToCart: (id: number, quantity: number) => Promise<void>
}
const CartContext = createContext<ICartContext | null>(null);
type CartContextType = {children: ReactNode};
export const CartContextProvider = ({children}: CartContextType) => {
  const [cartItems, setcartItems] = useState<any>();
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [productKey, setProductKey] = useState<string>('');
  const [variations, setvariation]=useState<number[]>([])
  const [quantity, setQuantity]=useState<number>()
  const {productById} = useProductContext();
const addToCart = async (id:number,quantity:number) => {
        const result = await CartApi.addToCart({
        id: productById?.variations[0],
        quantity: quantity,
      });
      console.log("resultresultresultresult=============",result);
            console.log('id', id);
      console.log('quantity', quantity);
  };
  // CART ITEM LIST
  const getCartList = async () => {
    const {
      result: {data},
    } = await CartApi.getCartList();
    setcartItems(data);
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
    setQuantity ,
    addToCart
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('Please cart context wrap in to cart context provider!');

  return context;
};
