import React from 'react';
import { Text, TextInput } from 'react-native';

import { styles } from './styles';
import i18n from './i18n';

export default function RepeatAfter({ setEndTimes, endTimes, lang }) {
  return (
    <>
      <Text style={styles.inputTextLabel}>{i18n(lang, 'stop_after')}</Text>
      <TextInput
        keyboardType="number-pad"
        style={styles.text_and_input}
        placeholder={i18n(lang, 'stop_after')} 
        onChangeText={(text) => setEndTimes(+text)}
        defaultValue={'' + endTimes}
      />
    </>
  );
}
