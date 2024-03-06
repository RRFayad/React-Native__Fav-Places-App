import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";

import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import CustomButton from "../UI/CustomButton";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const savePlaceHandler = () => {
    console.log(enteredTitle);
    console.log(selectedImage);
    console.log(pickedLocation);
  };

  return (
    <ScrollView className="flex-1 p-6">
      <View>
        <Text className="mb-1 font-bold text-primary-500">TITLE</Text>
        <TextInput
          className="my-2 border-2 border-b-primary-700 bg-primary-100 px-1 py-2 text-base"
          onChangeText={(enteredText) => setEnteredTitle(enteredText)}
        />
      </View>
      <ImagePicker onTakeImage={(imageUri) => setSelectedImage(imageUri)} />
      <LocationPicker
        onPickLocation={(location) => setPickedLocation(location)}
      />
      <CustomButton onPress={savePlaceHandler}>Add Place</CustomButton>
    </ScrollView>
  );
}

export default PlaceForm;
