import * as React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {Appbar} from 'react-native-paper';
interface IHeaderBar {
  backAction?: Function | undefined;
  right2Action?: Function | undefined;
  right1Action?: Function | undefined;
  title?: string;
  icon1?: string;
  icon2?: string;
  titleStyle?: StyleProp<TextStyle>;
}
export const HeaderBar = ({
  title = '',
  backAction = undefined,
  right2Action = undefined,
  right1Action = undefined,
  icon1 = '',
  icon2 = '',
  titleStyle = {},
}: IHeaderBar) => {
  return (
    <>
      <Appbar.Header>
        {backAction && (
          <Appbar.BackAction
            onPress={() => {
              backAction();
            }}
          />
        )}
        <Appbar.Content title={title} titleStyle={titleStyle} />
        {right2Action && (
          <Appbar.Action
            icon={icon2}
            onPress={() => {
              right2Action();
            }}
          />
        )}
        {right1Action && (
          <Appbar.Action
            icon={icon1}
            onPress={() => {
              right1Action();
            }}
          />
        )}
      </Appbar.Header>
    </>
  );
};
