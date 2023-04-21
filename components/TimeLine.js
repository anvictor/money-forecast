import React from "react";
import { Text, ScrollView, View } from "react-native";
import uuid from 'react-native-uuid';

import { styles } from "./styles";
import TimeLinePoint from "./TimeLinePoint";

export default function TimeLine({
  data,
  setSourceToModyfication,
  getIsCloseToBottom,
  lang,
}) {
  const isCloseToBottom = async ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 120;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <ScrollView
      contentContainerStyle={styles.timeLineContainer}
      onMomentumScrollEnd={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          getIsCloseToBottom();
        }
      }}
      scrollEventThrottle={1}
    >
      {data &&
        data.map((event) => {
          return (
            <TimeLinePoint
              id={`${event.source.id}=${uuid.v4()}`}
              source={event.source}
              date={event.date}
              balance={event.balance}
              setSourceToModyfication={setSourceToModyfication}
              lang={lang}
            />
          )
        })}
      {!data && <Text>No Data for timeline</Text>}
    </ScrollView>
  );
}
