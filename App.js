import React, { useState, useEffect } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import ModifyFinancialEvent from './components/ModifyFinancialEvent';
import TimeLine from './components/TimeLine';
import { styles, colors } from './components/styles';
import { MOCKED, getVisiblePointsArray, shiftDate } from './components/utils';
import PlusIcon from './components/PlusIcon';
import i18n from './components/i18n';
import LangSwitcher from './components/LangSwitcher';

export default function App() {
  const [isTimeLineVisible, setIsTimeLineVisible] = useState(true);
  const [eventsData, setEventsData] = useState(MOCKED || []);     
  const [lang, setLang] = useState({label:'ua', value:'ua'});
  const [sourceToModyfication, setSourceToModyfication] = useState(null);
  const [endVisibleDate, setEndVisibleDate] = useState(
    shiftDate('Month', Date.now(), 10, 1, 0)
  );
  const dataVisiblePart = getVisiblePointsArray(
    eventsData,
    endVisibleDate,
    lang.value
  );
  const getIsCloseToBottom = () => {
    setEndVisibleDate(shiftDate('Month', endVisibleDate, 1, 1, 0));
  };

  const preFilterEvents = (event) => {
    const id = event.id;
    return eventsData.filter((event) => event.id !== id);
  };

  const removeModyfiedEvent = (event) => {
    const modyfiedEventsData = preFilterEvents(event);
    setEventsData(modyfiedEventsData); // TODO remove old item and push modified same name item
  };

  const addModyfiedEvent = (event) => {
    const modyfiedEventsData = preFilterEvents(event);
    const pushed = modyfiedEventsData.concat([event]);
    setEventsData(pushed);
  };

  useEffect(() => {
    if (sourceToModyfication) {
      setIsTimeLineVisible(false);
    }
  }, [sourceToModyfication]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.veryPeryLight }}>
      <Text style={styles.mainTitle}>{i18n(lang.value, 'financial_forecast')}</Text>

      {isTimeLineVisible && (
        <>
          <LangSwitcher label={lang.value} onSelect={setLang} />
          <View style={styles.createNewContainer}>
            <Text style={styles.createNewText}>
              {i18n(lang.value, 'create_new_financial_event')}
            </Text>
            <TouchableHighlight
              onPress={() => setSourceToModyfication({})}
              style={{ backgroundColor: '#aabb99', paddingLeft: 9 }}>
              <PlusIcon />
            </TouchableHighlight>
          </View>
          <TimeLine
            data={dataVisiblePart}
            setSourceToModyfication={setSourceToModyfication}
            getIsCloseToBottom={getIsCloseToBottom}
            lang={lang.value}
          />
        </>
      )}
      {!isTimeLineVisible && (
        <ModifyFinancialEvent
          financialEvent={sourceToModyfication}
          setIsTimeLine={setIsTimeLineVisible}
          addModyfiedEvent={addModyfiedEvent}
          removeModyfiedEvent={removeModyfiedEvent}
          lang={lang.value}
        />
      )}
    </View>
  );
}
