import { View, Alert, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import OutlinedButton from "../UI/OutlinedButton";
import { getMapPreview } from "../../../util/location";
import { useState } from "react";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [permissionInfo, requestPermission] = useForegroundPermissions();

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
  const pickOnMapHandler = () => {};

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
