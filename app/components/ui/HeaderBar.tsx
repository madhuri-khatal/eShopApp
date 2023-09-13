import * as React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import {Appbar} from 'react-native-paper';
interface IHeaderBar {
  backAction?: Function | undefined;
  right2Action?: Function | undefined;
  right1Action?: Function | undefined;
  title?: string;
  icon1?: string;
  icon2?: string;
  titleStyle?: StyleProp<TextStyle>;
  badgeCount?: number;
}
export const HeaderBar = ({
  title = '',
  backAction = undefined,
  right2Action = undefined,
  right1Action = undefined,
  icon1 = '',
  icon2 = '',
  titleStyle = {},
  badgeCount = 0, 
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
        {/* {right2Action && (
          <Appbar.Action
            icon={icon2}
            onPress={() => {
              right2Action();
            }}
          />
        )} */}

{right2Action && (
          <View style={{ position: 'relative' }}>
            <Appbar.Action
              icon={icon2}
              onPress={() => {
                right2Action();
              }}
            />
            {badgeCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badgeCount}</Text>
              </View>
            )}
          </View>
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
const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});