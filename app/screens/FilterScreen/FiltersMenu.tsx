import { FilterApi } from "../../api/FilterApi";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import FilterCategory from "./FilterCategory";
import React from "react";

const FiltersMenu = ({isVisible, filterData}: any) => {
  const [mainCategory, setMainCategory] = useState <any>([]);

  useEffect (() => {
    (async () => {
      const {
        result: {data},
        err,
      } = await FilterApi.getMainCategory();
       err && console.log('error');

      setMainCategory(data);
    })();
  }, []);
   if (!isVisible) {
    return null;
  }

  return (
    <ScrollView style={{}}>
      {mainCategory.map((category: any) => (
          <FilterCategory
          key={category.id}
          name={category?.name}
                />
      ))}
    </ScrollView>
  );
};
 
export default FiltersMenu