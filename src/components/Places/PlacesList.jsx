import { FlatList, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
  return (
    <>
      {(!places || places.length === 0) && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-primary-200 text-base">
            No Places Added Yet!
          </Text>
        </View>
      )}
      {places && places.length > 0 && (
        <FlatList
          data={places}
          key={(place) => place.id}
          renderItem={({ item }) => <PlaceItem place={item} />}
        />
      )}
    </>
  );
}

export default PlacesList;
