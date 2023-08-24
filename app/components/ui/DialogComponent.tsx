import React from 'react';
import {Button, Dialog, Portal, Text} from 'react-native-paper';

interface IDialogComponent {
  visible?: boolean;
  hideDialog?: () => void;
  firstAction?: () => void;
  secondAction?: () => void;
  message?: string;
  title?: string;
}
export const DialogComponent = ({
visible = false,
  hideDialog,
  firstAction,
  secondAction,
  message = 'Are You Sure To Delete?',
  title = '',
}: IDialogComponent) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={firstAction}>Yes</Button>
          <Button onPress={secondAction}>No</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
