import { OverlayContainer } from '@react-native-aria/overlays';
import React from 'react';
import { Box } from 'native-base';
import { Backdrop } from '..';

const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children?: any;
  isOpen: boolean;
  onClose?: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <OverlayContainer>
      <Backdrop onClick={onClose ? onClose : () => {}} />
      <Box
        margin="auto"
        top={0}
        bottom={0}
        left={0}
        right={0}
        bg="white"
        minWidth={64}
        minHeight={24}
        opacity={1}
      >
        {children ? children : null}
      </Box>
    </OverlayContainer>
  );
};

export default Modal;
