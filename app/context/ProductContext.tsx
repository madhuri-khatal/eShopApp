import {useNavigation} from '@react-navigation/native';
import {FilterApi} from './../api/FilterApi';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {ProductApi} from './../api/ProductApi';

interface IProductContext {
  data: any;
  mainCategory: any[];
  getSubCategoery: Function;
  subCategory: any[];
  setSubCategory: Function;
  onClose: Function;
  setProductByID: any;
  getProductById: Function;
}
const ProductContext = createContext<IProductContext | null>(null);
type ProductContextType = {children: ReactNode};
export const ProductContextProvider = ({children}: ProductContextType) => {
  const [data, setData] = useState<any>([1, 2, 3]);
  const [mainCategory, setMainCategory] = useState<any>([]);
  const [subCategory, setSubCategory] = useState<any>([]);
  const [productId, setProductByID] = useState<any>();
  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const {
        result: {data},
        err,
      } = await FilterApi.getMainCategory();

      err && console.log('error');

      setMainCategory(data);
    })();
  }, []);
  // SUBCATEGORY
  const getSubCategoery = async (id: number | string) => {
    try {
      const {
        result: {data},
        err,
      } = await FilterApi.getProductSubCategoeriesList(id);
      setSubCategory(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  const onClose = async () => {
    setIsDrawerVisible(!isDrawerVisible);
    console.log('pressed');
    // setClose(true)
  };

  // PRODUCTBYID
  const getProductById = async (id: number | string) => {
    try {
      const {
        result,
        err,
      } = await ProductApi.getProductById(id);
      console.log('***************************PRODUCT BY ID',result);
      setProductByID(result);
    } catch (err: any) {
      console.log('Error in prodectBy ID', err);
    }
  };

  const value: IProductContext = {
    data,
    mainCategory,
    getSubCategoery,
    subCategory,
    setSubCategory,
    onClose,
    setProductByID,
    getProductById,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error(
      'Please product context wrap in to product context provider!',
    );

  return context;
};
