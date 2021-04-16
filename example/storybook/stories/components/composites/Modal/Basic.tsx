import React from 'react';
import { Box, Button, Modal } from 'native-base';
import { useState } from 'react';

const Basic = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <Button onPress={() => setShowModal(true)}>Button</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Box display="flex" h="100%" bg="red.200"></Box>
      </Modal>
    </>
  );
};

export default Basic;
