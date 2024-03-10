import { ScrollView, Image, View, Text } from "react-native";

import OutlinedButton from "../components/UI/OutlinedButton";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../../util/database";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    const loadPlaceData = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    };
    loadPlaceData();
  }, [selectedPlaceId]);

  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  };

  if (!fetchedPlace) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading Place Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image
        className="h-[35%] min-h-[300px] w-[100%]"
        source={{ uri: fetchedPlace.imageUri }}
      />
      <View className="items-center justify-center">
        <View className="p-5">
          <Text className="text-center text-base font-bold text-primary-500">
            {fetchedPlace.address}
          </Text>
        </View>
        <OutlinedButton icon={"map"} onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;
