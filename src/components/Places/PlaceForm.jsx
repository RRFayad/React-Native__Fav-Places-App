import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  return (
    <ScrollView className="flex-1 p-6">
      <View>
        <Text className="mb-1 font-bold text-primary-500">TITLE</Text>
        <TextInput
          className="my-2 border-2 border-b-primary-700 bg-primary-100 px-1 py-2 text-base"
          onChangeText={(enteredText) => setEnteredTitle(enteredText)}
        />
      </View>
    </ScrollView>
  );
}

export default PlaceForm;
