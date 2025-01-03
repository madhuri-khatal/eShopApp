import axios, {AxiosRequestConfig} from 'axios';

import {consumer_key, consumer_secret, API_URL,Nonce} from '@env';
import {btoa} from 'react-native-quick-base64';
import Response from './Response';
export abstract class RequestDefaults {
  public static token: string = '';

  public static version: string = '';
  public static changeToken(t: string) {
    RequestDefaults.token = t;
  }
}

const parseError = (errText: string): Array<string | any> => {
  try {
    let err = JSON.parse(errText);
    return (err && err.error) || err || [];
  } catch (e) {
    return [];
  }
};

export const Get = async <T>(
  path: string,
  json?: AxiosRequestConfig<any> | undefined,
) => {
  let response: Response<T> = {};
  try {
    const header = {
      headers: {
        Authorization: `Basic ${btoa(`${consumer_key}:${consumer_secret}`)}`,
      },
    };
    response.result = (await axios.get(`${API_URL}${path}`, header)) as T;
  } catch (e: any) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};

export const GetFeatuare = async <T>(
  path: string,
  json?: AxiosRequestConfig<any> | undefined,
) => {
  let response: Response<T> = {};
  try {

    response.result = (await axios.get(`${API_URL}${path}`)) as T;
  } catch (e: any) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};
export const Delete = async <T>(
  path: string,
  json?: AxiosRequestConfig<any> | undefined,
) => {
  let response: Response<T> = {};
  try {
    const header = {
      headers: {
        Authorization: `Basic ${btoa(`${consumer_key}:${consumer_secret}`)}`,
      },
    };
    response.result = (await axios.delete(`${API_URL}${path}`, header)) as T;
  } catch (e: any) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};

export const Post = async <T>(
  path: string,
  json?: AxiosRequestConfig<any> | undefined,
) => {
  let response: Response<T> = {};
  try {
           const header = {
      headers: {
        Authorization: `Basic ${btoa(`${consumer_key}:${consumer_secret}`)}`,
        'Content-Type': 'application/json',
      },
       };
       response.result = (await axios.post(`${API_URL}${path}`,json, header)) as T;
     } catch (e: any) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};




export const Create = async <T>(
  path: string,
  json?: AxiosRequestConfig<any> | undefined,
) => {
  let response: Response<T> = {};
  try {
           const header = {
      headers: {
        Authorization: `Basic ${btoa(`${consumer_key}:${consumer_secret}`)}`,
        'Content-Type': 'application/json',Nonce,
      },
       };
       response.result = (await axios.post(`${API_URL}${path}`,json, header)) as T;
     } catch (e: any) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};

export const Login = async <T>(path: any, json?: any) => {
  let response: Response<T> = {};
  try {
    response.result = (await axios.post(`${API_URL}${path}`, json)) as T;
  } catch (e: any) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};

export const Patch = async <T>(path: string, json?: any) => {
  let response: Response<T> = {};
  try {
    response.result = (await axios.patch(`${API_URL}${path}`, json)) as T;
  } catch (e: any) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};

export const UploadFile = async <T>(path: string, json?: any) => {
  let response: Response<T> = {};
  try {
    const formData = new FormData();
    formData.append('file', json);
    response.result = (await axios.post(`${API_URL}${path}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })) as T;
  } catch (e: any) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};
