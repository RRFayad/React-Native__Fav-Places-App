import { View, Alert } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import OutlinedButton from "../UI/OutlinedButton";

function LocationPicker() {
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
    console.log(location);
  };
  const pickOnMapHandler = () => {};

  return (
    <View>
      <View className="my-2 h-[200px] w-[100%] items-center justify-center rounded bg-primary-100"></View>
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
