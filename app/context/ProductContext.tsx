import {FilterApi} from './../api/FilterApi';
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IProductContext {
  data: any;
  mainCategory: any[];
  getSubCategoery: Function;
  subCategory: any[];
  setSubCategory: Function;
}
const ProductContext = createContext<IProductContext | null>(null);
type ProductContextType = {children: ReactNode};
export const ProductContextProvider = ({children}: ProductContextType) => {
  const [data, setData] = useState<any>([1, 2, 3]);
  const [mainCategory, setMainCategory] = useState<any>([]);
  const [subCategory, setSubCategory] = useState<any>([]);
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

  const value: IProductContext = {
    data,
    mainCategory,
    getSubCategoery,
    subCategory,
    setSubCategory,
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
