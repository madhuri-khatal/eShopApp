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
import {Alert} from 'react-native';

interface IProductContext {
  data: any;
  mainCategory: any[];
  getSubCategoery: Function;
  subCategory: any[];
  setSubCategory: Function;
  setProductByID: any;
  getProductById: Function;
  productById: any;
  productByCategoryId: any[];
  setProductByCategoryId: Function;
  getProductByCategoryId: Function;
  fetchMoreData: Function;
  isLoading?: boolean;
  refThreshold?: any;
  // getProductByFeatureCategory: Function;
  couponData: any[];
  getfeaturecategory: Function;
  productByFeatureCategory: any[];
  // getHomeSlider: Function;
  // productData: any[]
  // productlist: () => Promise<void>
}
const ProductContext = createContext<IProductContext | null>(null);
type ProductContextType = {children: ReactNode};
export const ProductContextProvider = ({children}: ProductContextType) => {
  const [data, setData] = useState<any>([1, 2, 3]);
  const [mainCategory, setMainCategory] = useState<any>([]);
  const [couponData, setCouponData] = useState<any>([]);
  const [subCategory, setSubCategory] = useState<any>([]);
  const [productById, setProductByID] = useState<any>(null);
  const [productByCategoryId, setProductByCategoryId] = useState<any[]>([]);
  const [productByFeatureCategory, setProductByFeatureCategory] = useState<
    any[]
  >([]);
  // const [productData,setProductData]=useState<any[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation: any = useNavigation();
  const refThreshold = useRef(null);
  const paginationIncrement = useRef(1);

  // ALL PRODUCTS LIST
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
  // productlist
  // const productlist = async () => {
  //   try {
  //     const {
  //       result: {data},
  //       err,
  //     } = await ProductApi.getProductList();
  //     setProductData(data);
  //   } catch (error: any) {
  //     console.error(error);
  //   }
  // };
  // PAGINATION
  const fetchMoreData = async () => {
    try {
      setIsLoading(true);
      paginationIncrement.current = paginationIncrement.current + 1;
      const {
        result: {data},
        err,
      } = await ProductApi.pagination(paginationIncrement.current);
      setProductByCategoryId([...productByCategoryId, ...data]);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log('error', error);
    } finally {
    }
  };

  //PRODUCT MAIN CATEGORY
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

  // COUPON LIST
  useEffect(() => {
    (async () => {
      const {
        result: {data},
        err,
      } = await ProductApi.getCouponListAll();
      err && console.log('error');
      setCouponData(data);
    })();
  }, []);

  //PRODUCT SUBCATEGORY
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

  // Featured Products
  const getfeaturecategory = async () => {
    const {
      result: {data},
    } = await FilterApi.getfeaturecategory();
    setProductByFeatureCategory(data);
  };

  // const getProductByFeatureCategory = async () => {
  //   const res = await ProductApi.getProductByFeatureCategory();
  // };



  // // HomePage Slider
  // const getHomeSlider = async () => {
  //   const res = await ProductApi.getHomeSliderImages();
  //   console.log('res====', res);
  // };


  const value: IProductContext = {
    data,
    mainCategory,
    getSubCategoery,
    subCategory,
    setSubCategory,
    setProductByID,
    getProductById,
    productById,
    productByCategoryId,
    getProductByCategoryId,
    setProductByCategoryId,
    fetchMoreData,
    isLoading,
    refThreshold,
    // getProductByFeatureCategory,
    couponData,
    getfeaturecategory,
    productByFeatureCategory,
    // getHomeSlider,
    // productData,
    // productlist
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
