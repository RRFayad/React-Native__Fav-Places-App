import { FlatList, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
  const navigation = useNavigation();

  return (
    <>
      {(!places || places.length === 0) && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-primary-200">
            No Places Added Yet!
          </Text>
        </View>
      )}
      {places && places.length > 0 && (
        <FlatList
          data={places}
          key={(place) => place.id}
          renderItem={({ item }) => (
            <PlaceItem
              place={item}
              onSelect={(id) =>
                navigation.navigate("PlaceDetails", { placeId: id })
              }
            />
          )}
          className="m-6"
        />
      )}
    </>
  );
}

export default PlacesList;
