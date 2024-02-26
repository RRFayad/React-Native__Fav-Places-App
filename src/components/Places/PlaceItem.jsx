import { View, Image, Pressable, Text } from "react-native";

function PlaceItem({ place, onSelect: selectHandler }) {
  return (
    <Pressable onPress={selectHandler}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;
