import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { styles, colors } from './styles';

const PlusIcon = () => (
  <Icon
    name="plus-square-o"
    size={40}
    color={colors.veryPery}
    style={{
      marginTop: 15,
      marginRight: 15,
      marginBottom: -25,
    }}
  />
);

export default PlusIcon;
