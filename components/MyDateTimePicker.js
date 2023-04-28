import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import PickerSelect from "react-native-picker-select";
import NumInput from "./NumInput";
import Modal from "react-native-modal";
import { styles } from "./styles";
import { pickerSelectStyles } from "./styles";
import i18n from "./i18n";
import { datepickerDate } from "./utils";

const MyDateTimePicker = ({ value, onChange, onCancel, lang, label }) => {
  const valueDate = new Date(Date.parse(value));
  const [day, setDay] = useState("" + valueDate.getDate());
  const [month, setMonth] = useState("" + (valueDate.getMonth() + 1));
  const [year, setYear] = useState("" + valueDate.getFullYear());

  const maxDayOfMonth = (month, year) => {
    const lastDay = new Date(year, month, 0).getDate();
    return lastDay;
  };

  const [dayMax, setDayMax] = useState(maxDayOfMonth(month, year));

  const handleSave = () => {
    const isYY = year > 1970;
    const isMM = month > 0 && month < 13;
    const isDD = maxDayOfMonth(month, year) >= day && day > 0;
    const isDateOk = isDD && isMM && isYY;
    if (!isYY) {
      setYear("");
    }
    if (!isMM) {
      setMonth("");
    }
    if (!isDD) {
      setYear("");
    }
    if (isDateOk) {
      const startDate = new Date(year, +month - 1, +day).getTime();
      onChange(startDate);
    }
  };
  console.log(year, month, day);
  useEffect(() => {
    setDayMax(maxDayOfMonth(month, year));
    setDay(maxDayOfMonth(month, year));
  }, [day, month, year]);

  return (
    <Modal isVisible={true}>
      <View style={styles.modalWhiteCentered}>
        <Text style={styles.labelDate}>{label}</Text>

        <View style={styles.dd_mm_yyyy_inputRow}>
          <View style={styles.yyyy_inputColumn}>
            <NumInput
              title={i18n(lang, "yyyy")}
              min={datepickerDate.yy.min}
              max={datepickerDate.yy.max}
              onValueChange={setYear}
              value={year}
            />
          </View>
          <View style={styles.dd_mm_inputColumn}>
            <NumInput
              title={i18n(lang, "mm")}
              min={1}
              max={12}
              onValueChange={setMonth}
              value={month}
            />
          </View>
          <View style={styles.dd_mm_inputColumn}>
            <NumInput
              title={i18n(lang, "dd")}
              min={datepickerDate.dd.min}
              max={dayMax}
              onValueChange={setDay}
              value={day}
            />
          </View>
        </View>
        <Pressable style={styles.button} onPress={onCancel}>
          <Text style={styles.button_text}>{i18n(lang, "cancel")}</Text>
        </Pressable>
        <Pressable
          style={day ? styles.button : styles.disabledBtn}
          disabled={!day}
          onPress={handleSave}
        >
          <Text style={styles.button_text}>{i18n(lang, "save")}</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default MyDateTimePicker;
