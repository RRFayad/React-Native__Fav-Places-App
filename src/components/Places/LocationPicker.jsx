import { useEffect, useState } from "react";
import { View, Alert, Image, Text } from "react-native";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import OutlinedButton from "../UI/OutlinedButton";
import { getMapPreview } from "../../../util/location";

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState(null);
  const isFocused = useIsFocused(); // As the screens stack over each other, we use this hook to update

  const navigation = useNavigation();
  const route = useRoute();

  const [permissionInfo, requestPermission] = useForegroundPermissions();

  // console.log(mapPickedLocation);

  useEffect(() => {
    if (isFocused && route.params) {
      // Case when we come from the map with a picked location
      const mapPickedLocation = route.params.pickedLocation;
      setPickedLocation({
        lat: mapPickedLocation.latitude,
        lng: mapPickedLocation.longitude,
      });
    }
  }, [route, isFocused]);

  useEffect(() => {
    onPickLocation(pickedLocation);
  }, [pickedLocation]);

  const verifyPermission = async () => {
    if (permissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (permissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "No Permission",
        "Allow the app to use this location feature",
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    console.log(location);
  };
  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View>
      <View className="my-2 h-[200px] w-[100%] items-center justify-center rounded bg-primary-100">
        {!pickedLocation && <Text className="">No location selected yet</Text>}
        {pickedLocation && (
          <Image
            className="h-[100%] w-[100%]"
            source={{
              uri: getMapPreview(
                process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                pickedLocation.lat,
                pickedLocation.lng,
              ),
            }}
          />
        )}
      </View>
      <View className="flex-row items-center justify-around">
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;
