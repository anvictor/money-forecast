import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { months } from "./utils";
import { styles, colors } from "./styles";
import i18n from "./i18n";
import Icon from "react-native-vector-icons/FontAwesome";

const EditIcon = () => <Icon name="edit" size={30} color={colors.veryPery} />;

export default function TimeLinePoint({
  id,
  date,
  balance,
  source,
  setSourceToModyfication,
  lang,
}) {
  const textColor = balance < 0 ? "red" : balance === 0 ? "white" : "green";
  const sign = source.isOutgoing ? -1 : 1;
  const handleEditEvent = () => {
    setSourceToModyfication(source);
  };

  const monthNumber = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = lang && months[lang][monthNumber];
  return (
    <View style={styles.timeLinePoint} key={id}>
      <View style={styles.timeLineDateColumn}>
        <Text style={styles.timeLineDate}>{day}</Text>
        <Text style={styles.timeLineDate}>{month}</Text>
        <Text style={styles.timeLineDate}>{year}</Text>
      </View>
      <View style={styles.timePointRightSide}>
        <View style={styles[`roundDot_${textColor}`]} />
        <View style={styles.name_icon_line}>
          <Text style={styles.nameText}>{source.name}</Text>
          <TouchableHighlight style={styles.editIcon} onPress={handleEditEvent}>
            <EditIcon />
          </TouchableHighlight>
        </View>
        <Text
          style={styles[`amountLabel_${source.isOutgoing ? "red" : "green"}`]}
        >
          {" "}
          {`${i18n(lang, "amount")}: ${source.amount * sign}`}{" "}
        </Text>
        <Text style={styles[`balanceText_${textColor}`]}>
          {" "}
          {`${i18n(lang, "balance")}: ${balance}`}{" "}
        </Text>
      </View>
    </View>
  );
}
