import React from 'react';
import {Text} from 'react-native-paper';

interface CurrencyProps {
  value: number;
  currencyCode?: string;
  locale?: string;
  style?: object;
}

const CurrencyComponent: React.FC<CurrencyProps> = ({
  value,
  currencyCode = 'INR',
  locale = 'en-US',
  style,
}) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(value);

  return <Text style={style}>{formattedValue}</Text>;
};

export default CurrencyComponent;
