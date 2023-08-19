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
  productById: any;
  productByCategoryId: any[];
  setProductByCategoryId: Function;
  getProductByCategoryId: Function;
  getProductDetailByCategoryId: Function;
  productDetailByCategoryId: any;
}
const ProductContext = createContext<IProductContext | null>(null);
type ProductContextType = {children: ReactNode};
export const ProductContextProvider = ({children}: ProductContextType) => {
  const [data, setData] = useState<any>([1, 2, 3]);
  const [mainCategory, setMainCategory] = useState<any>([]);
  const [subCategory, setSubCategory] = useState<any>([]);
  const [productById, setProductByID] = useState<any>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [productByCategoryId, setProductByCategoryId] = useState<any[]>([]);
  const [productDetailByCategoryId, setProductDetailByCategoryId] =
    useState<any>(null);
  const navigation: any = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const {
          result: {data},
          err,
        } = await ProductApi.getProductList();
        setProductByCategoryId(data);
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, []);

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
        result: {data},
        err,
      } = await ProductApi.getProductById(id);
      setProductByID(data);
    } catch (err: any) {
      console.log('Error in prodectBy ID', err);
    }
  };

  // PRODUCTLIST BY CATEGORY ID
  const getProductByCategoryId = async (id: number | string) => {
    try {
      const {result: {data = []} = {}, err} =
        await ProductApi.getProductByCategoryId(id);
           setProductByCategoryId(data);
      // data?.length > 0 && setProductByCategoryId(data);
      // data?.length == 0 || (data && setProductByCategoryId([]));
    } catch (err: any) {
      console.log('Error in Product By Cateory Id', err);
    }
  };

  //PRODUCT DETAIL BY CATEGORY ID
  const getProductDetailByCategoryId = async (id: number | string) => {
    try {
      const {
        result: {data},
                } = await ProductApi.getProductDetailByCategoryId(id);
      setProductDetailByCategoryId(data);
    } catch (err: any) {
      console.log('Error In Product Detail By CategoryId', err);
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
    productById,
    productByCategoryId,
    getProductByCategoryId,
    setProductByCategoryId,
    getProductDetailByCategoryId,
    productDetailByCategoryId,
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
