import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";

interface Props {
  title: string;
  min: number;
  max: number;
  onValueChange: (value: number) => void;
  value: number;
}

function NumInput({ title, min, max, onValueChange, value }: Props) {
  const [inputValue, setInputValue] = useState(value.toString());
  const isWarning = +value < +inputValue;
  const [backgroundColor, setBackgroundColor] = useState("white");

  const handleInput = (text: string) => {
    const numericValue = parseInt(text, 10);
    setInputValue(text);
    if (min > +text) {
      onValueChange(min);
      setBackgroundColor("red");
    }
    if (min <= +text && +text <= max) {
      onValueChange(numericValue);
      setBackgroundColor("white");
    }
    if (+text > max) {
      onValueChange(max);
      setBackgroundColor("red");
    }
  };

  useEffect(() => {
    if (isWarning) {
      setInputValue(max.toString());
      setBackgroundColor("red");
    }
  }, [isWarning]);

  return (
    <View>
      <Text
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          backgroundColor: backgroundColor,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          backgroundColor: backgroundColor,
        }}
        onChangeText={handleInput}
        value={"" + inputValue}
        keyboardType="numeric"
        textAlign="center"
      />
    </View>
  );
}

export default NumInput;
