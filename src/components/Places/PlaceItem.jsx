import { View, Image, Pressable, Text } from "react-native";

function PlaceItem({ place, onSelect: selectHandler }) {
  // console.log(place);
  return (
    <Pressable
      onPress={() => selectHandler(place.id)}
      className="my-3 h-20 flex-row items-start rounded-md bg-primary-500 shadow shadow-black active:opacity-90"
      style={{ elevation: 2 }}
    >
      <Image
        source={{ uri: place.imageUri }}
        className="h-[100%] w-[100%] flex-1"
      />

      <View className="flex-2 rounded-l-md p-3">
        <Text className="text-lg font-bold text-gray-700">
          {place.title || "Custom Place"}
        </Text>
        <Text className="max-w-[60vw] text-xs text-gray-700">
          {place.address}
        </Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;
