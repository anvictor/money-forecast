import React, { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import ToDate from './ToDate';
import RepeatAfter from './RepeatAfter';
import { styles } from './styles';
import {
  selectDropdownPeriod,
  selectDropdownEndRepeat,
  capitalize,
} from './utils';
import i18n from './i18n';

export default function Periodically({
  endDate,
  setEndDate,
  period: periodProps,
  setPeriod: setPeriodProps,
  endRepeat: endRepeatProps,
  setEndRepeat: setEndRepeatProps,
  endTimes,
  setEndTimes,
  customPeriod,
  setCustomPeriod,
  lang,
}) {
  const selectDropdownEndRepeatLocal = selectDropdownEndRepeat.map((item) =>
    i18n(lang, item.toLowerCase())
  );
  const selectDropdownPeriodLocal = selectDropdownPeriod.map((item) =>
    i18n(lang, item.toLowerCase())
  );

  const [isOpenEndRepeat, setIsOpenEndRepeat] = useState(false);
  const [isOpenPeriod, setIsOpenPeriod] = useState(false);

  const endRepeatIndex = selectDropdownEndRepeat.indexOf(endRepeatProps, 0);
  const periodIndex = selectDropdownPeriod.indexOf(periodProps, 0);

  const [endRepeat, setEndRepeat] = useState(selectDropdownEndRepeatLocal[0]);
  const [period, setPeriod] = useState(selectDropdownPeriodLocal[0]);

  const handleSetEndRepeat = (i) => {
    setEndRepeat(selectDropdownEndRepeatLocal[i]);
    setEndRepeatProps(capitalize(selectDropdownEndRepeat[i]));
  };

  const handleSetPeriod = (i) => {
    setPeriod(selectDropdownPeriodLocal[i]);
    setPeriodProps(capitalize(selectDropdownPeriod[i]));
  };

  return (
    <View style={styles.periodicalBox}>
      <Text style={styles.inputTextLabel}>
        {i18n(lang, 'end_of_repetition')}:
      </Text>

      <SelectDropdown
        defaultValue={selectDropdownEndRepeatLocal[endRepeatIndex]}
        data={selectDropdownEndRepeatLocal}
        onSelect={(_endRepeat, index) => handleSetEndRepeat(index)}
        buttonTextAfterSelection={(_endRepeat, index) =>
          selectDropdownEndRepeatLocal[index]
        }
        rowTextForSelection={(item) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
      {endRepeatProps === 'Date' && (
        <ToDate endDate={endDate} setEndDate={setEndDate} lang={lang} />
      )}
      {endRepeatProps === 'After' && (
        <RepeatAfter
          setEndTimes={setEndTimes}
          endTimes={endTimes}
          lang={lang}
        />
      )}
      {periodProps !== 'Custom' && (
        <Text style={styles.inputTextLabel}>{i18n(lang, 'period_every')}</Text>
      )}

      <SelectDropdown
        defaultValue={selectDropdownPeriodLocal[periodIndex]}
        data={selectDropdownPeriodLocal}
        onSelect={(period, index) => handleSetPeriod(index)}
        buttonTextAfterSelection={(period, index) =>
          selectDropdownPeriodLocal[index]
        }
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
      {periodProps === 'Custom' && (
        <>
          <Text>{i18n(lang, 'custom_period_every')}</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.text_and_input}
            placeholder={i18n(lang, 'type_period_in_days')}
            onChangeText={setCustomPeriod}
            defaultValue={customPeriod || 1}
          />
          <Text>{i18n(lang, 'days')}</Text>
        </>
      )}
    </View>
  );
}
