import React, { useState } from 'react';
import { Text } from 'react-native';
import MyDateTimePicker from './MyDateTimePicker';
import { styles } from './styles';
import { dates } from './utils';
import i18n from './i18n';
const nowDate = new Date();

export default function ToDate({ endDate, setEndDate, lang }) {
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [textEndDate, setTextEndDate] = useState(
    endDate === undefined ? '' : `${dates.format(endDate)}`
  );

  const hideEndDataPicker = () => {
    setIsEndDatePickerVisible(false);
  };

 const handleEndDataConfirm = (timestamp) => { 
   
    const endDate = new Date(
      timestamp +
        2 * 60 * 60 * 1000 +
        nowDate.getUTCHours() * 60 * 60 * 1000 +
        nowDate.getUTCMinutes() * 60 * 1000 +
        nowDate.getUTCSeconds() * 1000
    );
    console.log('A finishDate has been picked: ');
    console.log(dates.format(endDate, lang));
    setEndDate(endDate);
    setTextEndDate(dates.format(endDate));
    hideEndDataPicker();
  };

  return (
    <>
      <Text style={styles.inputTextLabel}>{i18n(lang, 'finish_date')}</Text>
      <Text
        style={styles.text_and_input}
        onPress={() => setIsEndDatePickerVisible(true)}>
        {textEndDate}
      </Text>
      {isEndDatePickerVisible && (
      <MyDateTimePicker
        label={i18n(lang, 'finish_date')}
        value={endDate} 
        onChange={handleEndDataConfirm}
        onCancel={hideEndDataPicker}
        lang={'ua'}     
      />)}
    </>
  );
}
