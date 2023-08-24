import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ICommanContext {
  snackBarVisible?: boolean;
  snackBarMessage?: string;
  snackBarDuration?: number;
  setSnackBarVisible?: Function;
  setSnackBarMessage?: Function;
  setSnackBarDuration?: Function;
}

const CommanContext = createContext<null | ICommanContext>(null);

type CommanContextType = {children: ReactNode};

export const CommanContextProvider = ({children}: CommanContextType) => {
  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');
  const [snackBarDuration, setSnackBarDuration] = useState<number>(2000);
const [setDialogVisible,dialogVisible]=useState<boolean>(false)
  const value: ICommanContext = {
    snackBarVisible,
    snackBarMessage,
    snackBarDuration,
    setSnackBarVisible,
    setSnackBarMessage,
    setSnackBarDuration,
  };

  return (
    <CommanContext.Provider value={value}>{children}</CommanContext.Provider>
  );
};

export const useCommanContext = () => {
  const context = useContext(CommanContext);
  if (!context)
    throw new Error('CommanContext wrap in  CommanContext provider');
  return context;
};
