import React, { useContext } from 'react';


/***
 *
 * Filter Query params
 *
 ***/


export const DeleteCookie = (name: string, subdomain?: string) => {
  const cookieDomain = process.env.NODE_ENV === 'development' ? 'localhost' : subdomain || 'crowdstaffing.com';
  document.cookie = `${name}=;path=/;domain=${cookieDomain};expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

/***
 *
 * Filter Query params
 *
 ***/
 export const FilterQueryParams = (queryParams: any) => {
  let params: { [index: string]: any } = { ...queryParams } as Object;
  const paramKeys = Object.keys(params);

  // Removes empty query params
  paramKeys.map(key => {
    if (typeof params[key] !== 'boolean' && !params[key]) {
      delete params[key];
    }
  });

  return params;
};







