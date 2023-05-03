import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  Switch,
  View,
  TextInput,
  Pressable,
} from "react-native";
import uuid from "react-native-uuid";
import MyDateTimePicker from "./MyDateTimePicker";
import Periodically from "./Periodically";
import { dates } from "./utils";
import { styles, colors } from "./styles";
import i18n from "./i18n";

export default function ModifyFinancialEvent({
  financialEvent,
  setIsTimeLine,
  addModyfiedEvent,
  removeModyfiedEvent,
  lang,
}) {
  const {
    id: propsId,
    name: propsName,
    startDate: propsStartDate,
    endRepeat: propsEndRepeat, // [Never, Date, After]
    endDate: propsEndDate,
    endTimes: propsEndTimes,
    period: propsPeriod, // [None, Day, Week, Month, Year, Custom]
    customPeriod: propsCustomPeriod,
    amount: propsAmount,
    isOutgoing: propsIsOutgoing,
  } = financialEvent;

  const [name, setName] = useState(propsName || "");
  const [isAmountNumber, setIsAmountNumber] = useState(true);
  const [endRepeat, setEndRepeat] = useState(propsEndRepeat || "Never"); // [Never, Date, After]
  const [endTimes, setEndTimes] = useState(propsEndTimes || 1);
  const [period, setPeriod] = useState(propsPeriod || "None"); // [None, Day, Week, Month, Year, Custom]
  const [customPeriod, setCustomPeriod] = useState(propsCustomPeriod || 0);
  const [amount, setAmount] = useState(propsAmount || 1);
  const [isOutgoing, setIsOutgoing] = useState(propsIsOutgoing || false);
  const [isOnce, setIsOnce] = useState(period === "None");
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const id = propsId || uuid.v4();
  const nowDate = new Date();
  const [startDate, setStartDate] = useState(propsStartDate || nowDate);
  const [endDate, setEndDate] = useState(propsEndDate || nowDate);
  const [isStartAfterEnd, setIsStartAfterEnd] = useState(
    dates.compare(startDate, endDate) > 0 ? true : false
  );

  const hideStartDataPicker = () => {
    setIsStartDatePickerVisible(false);
  };

  const handleChangeStartData = (timestamp) => {
    const startDate = new Date(
      timestamp +
        2 * 60 * 60 * 1000 +
        nowDate.getUTCHours() * 60 * 60 * 1000 +
        nowDate.getUTCMinutes() * 60 * 1000 +
        nowDate.getUTCSeconds() * 1000
    );
    setStartDate(startDate);
    console.log("A startDate has been picked: ");
    console.log(dates.format(startDate, lang));
    hideStartDataPicker();
  };

  const handleClickApply = () => {
    if (isStartAfterEnd) {
      console.error(i18n(lang, "start_after_end"));
    } else if (!isAmountNumber) {
      console.error(i18n(lang, "amount_number"));
    } else if (isAmountNumber) {
      const financialEvent = {
        id,
        name,
        startDate,
        endRepeat,
        endDate,
        endTimes,
        period,
        customPeriod,
        amount,
        isOutgoing,
      };

      removeModyfiedEvent(financialEvent);
      addModyfiedEvent(financialEvent);
      setIsTimeLine(true);
    }
  };

  const handleClickDelete = () => {
    const financialEvent = {
      id,
    };

    removeModyfiedEvent(financialEvent);
    setIsTimeLine(true);
  };

  const verifyAmount = (number) => {
    const isNum = !isNaN(+number);
    setIsAmountNumber(isNum);
    if (isNum) setAmount(+number);
  };

  useEffect(() => {
    setIsStartAfterEnd(dates.compare(startDate, endDate) > 0 ? true : false);
  }, [startDate, endDate]);

  return (
    <ScrollView contentContainerStyle={styles.modifierContainer}>
      <Text style={styles.header}>{i18n(lang, "modify_financial_event")}</Text>
      <Text style={styles.inputTextLabel}>
        {i18n(lang, "event_name")}{" "}
        <Text style={styles.required_asterix}>*</Text>
      </Text>
      <TextInput
        style={styles.text_and_input_Name}
        placeholder={i18n(lang, "type_the_event_name")}
        onChangeText={(eventName) => setName(eventName)}
        defaultValue={name}
        multiline={true}
      />
      <Text style={styles.inputTextLabel}>
        {i18n(lang, "start_date")}{" "}
        <Text style={styles.required_asterix}>*</Text>
      </Text>
      <Text
        style={styles.text_and_input_Start}
        onPress={() => setIsStartDatePickerVisible(true)}
      >
        {dates.format(startDate, lang)}
      </Text>
      {isStartDatePickerVisible && (
        <MyDateTimePicker
          label={i18n(lang, "start_date")}
          value={startDate}
          onChange={handleChangeStartData}
          onCancel={hideStartDataPicker}
          lang={lang}
        />
      )}
      <View style={styles.switcherLine}>
        <Text style={styles.switcherLabel}>{`${
          isOutgoing
            ? i18n(lang, "outgoing_payment")
            : i18n(lang, "incoming_payment")
        }`}</Text>
        <Switch
          trackColor={{ false: "#c97574", true: "#abdcab" }}
          thumbColor={"black"}
          ios_backgroundColor={"#c97574"}
          onValueChange={() => setIsOutgoing(!isOutgoing)}
          value={!isOutgoing}
        />
      </View>
      <View style={styles.switcherLine}>
        <Text style={styles.switcherLabel}>{`${
          isOnce ? i18n(lang, "once") : i18n(lang, "periodically")
        }`}</Text>
        <Switch
          trackColor={{ false: "grey", true: colors.veryPery }}
          thumbColor={"black"}
          ios_backgroundColor={"grey"}
          onValueChange={() => {
            if (!isOnce) setPeriod("None");
            if (isOnce) setPeriod("Month");
            setIsOnce(!isOnce);
          }}
          value={isOnce}
        />
      </View>

      {!isOnce && (
        <Periodically
          endDate={endDate}
          setEndDate={setEndDate}
          period={period}
          setPeriod={setPeriod}
          endRepeat={endRepeat}
          setEndRepeat={setEndRepeat}
          endTimes={endTimes}
          setEndTimes={setEndTimes}
          customPeriod={customPeriod}
          setCustomPeriod={setCustomPeriod}
          lang={lang}
        />
      )}
      <Text style={styles.inputTextLabel}>
        {i18n(lang, "positive_absolute_amount")}{" "}
        <Text style={styles.required_asterix}>*</Text>
        {!isAmountNumber && (
          <Text style={styles.required_asterix}>{i18n(lang, "number")} </Text>
        )}
      </Text>
      <TextInput
        keyboardType="number-pad"
        style={styles.text_and_input_Amount}
        placeholder={i18n(lang, "enter_amount")}
        onChangeText={verifyAmount}
        defaultValue={"" + amount}
      />
      <View style={styles.button_container}>
        <Pressable
          style={[styles.button, { alignSelf: "center" }]}
          onPress={handleClickDelete}
        >
          <Text style={styles.button_text}>{i18n(lang, "delete")}</Text>
        </Pressable>
      </View>
      <View style={styles.button_container}>
        <Pressable
          style={[styles.button, { alignSelf: "center" }]}
          onPress={() => setIsTimeLine(true)}
        >
          <Text style={styles.button_text}>{i18n(lang, "cancel")}</Text>
        </Pressable>
      </View>
      <View style={styles.button_container}>
        <Pressable
          style={[styles.button, { alignSelf: "center" }]}
          onPress={handleClickApply}
        >
          <Text
            style={isStartAfterEnd ? styles.disabledBtn : styles.button_text}
          >
            {i18n(lang, "apply")}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
