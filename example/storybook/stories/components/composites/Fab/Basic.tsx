import { Fab, Icon } from 'native-base';
import React from 'react';

export default function () {
  return (
    <Fab
      placement="bottom-right"
      bg="teal.200"
      icon={<Icon name="plus" type="AntDesign" />}
    />
  );
}
