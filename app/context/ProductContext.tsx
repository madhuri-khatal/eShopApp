import {useNavigation} from '@react-navigation/native';
import {FilterApi} from './../api/FilterApi';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
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
  fetchMoreData: Function;
  hasMoreData: any;
  isLoading?: boolean;
  refThreshold?: any;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation: any = useNavigation();
  const refThreshold = useRef(null);
  const [page, setPage] = useState<number>(1);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
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

  const fetchMoreData = async () => {
    try {
      setIsLoading(true);
      console.log('this is set is loading true');

      const {
        result: {data},
        err,
      } = await ProductApi.getProductList();
      setProductByCategoryId([...productByCategoryId, ...data]);
      setIsLoading(false);
      
    } catch (error) {
      console.log('error', error);
    } finally {
      
    }
  };

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
    } catch (err: any) {
      console.log('Error in Product By Cateory Id', err);
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
    fetchMoreData,
    hasMoreData,
    isLoading,
    refThreshold,
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
