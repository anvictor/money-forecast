import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

interface Props {
  min: number;
  max: number;
  onValueChange: (value: number) => void;
  value: number;
}

function NumInput({ min, max, onValueChange, value }: Props) {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleInput = (text: string) => {
    const numericValue = parseInt(text, 10);
  
    setInputValue(text);
    onValueChange(numericValue);
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={handleInput}
        value={inputValue}
        keyboardType="numeric"
      />
    </View>
  );
}

export default NumInput;
