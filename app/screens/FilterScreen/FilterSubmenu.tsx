// import React, { useEffect, useState } from 'react';
// import {View} from 'react-native';
// import FilterOption from './FilterOption';
// import { FilterApi } from "../../api/FilterApi";
// const FilterSubmenu = ({options,id}: any) =>{
//   const [subCategory,setSubCategory] =useState<any>([])
//   useEffect (() => {
//     (async () => {
//       const {
//         result: {data},
//         err,
//       } = await FilterApi.getProductSubCategoeriesList(id)
//       console.log("RESULT*****************",data);
      
//        err && console.log('error');

//        setSubCategory(data);
//     })();
//   }, []);
//   console.log("SUB&&&&&&&&&&&&&&&&&&&&", subCategory);
  
// return(
 
//     <View>
//       {subCategory.map((id:any, option: {id: any; name: any}) => (
//         <FilterOption key={option.id} name={option.name} id={option.id}/>
//       ))}
//     </View>
//   );
//       }
//   export default FilterSubmenu













import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import FilterOption from './FilterOption';
import { FilterApi } from '../../api/FilterApi';

const FilterSubmenu = ({ options, id }: any) => {
  const [subCategory, setSubCategory] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const {
        result: { data },
        err,
      } = await FilterApi.getProductSubCategoeriesList(id);
          if (err) {
        console.log('error');
      }
      setSubCategory(data);
    })();
  }, []);

  return (
    <View>
      {subCategory.map((option: { id: any; name: any }) => (
        <FilterOption key={option.id} name={option.name} id={option.id} />
      ))}
    </View>
  );
};

export default FilterSubmenu;
