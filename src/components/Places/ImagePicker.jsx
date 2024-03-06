import { useState } from "react";
import { View, Text, Alert, Image } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState(null);
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    // console.log(cameraPermissionInfo);

    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert("No Permission", "Allow the app to use this app");
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    // console.log(image.assets[0].uri);
    setPickedImage(image);
    onTakeImage(image.assets[0].uri);
  };

  return (
    <View>
      <View className="my-2 h-[200px] w-[100%] items-center justify-center rounded bg-primary-100">
        {!pickedImage && <Text className="">No image taken yet</Text>}
        {pickedImage && (
          <Image
            className="h-[100%] w-[100%]"
            source={{ uri: pickedImage.assets[0].uri }}
          />
        )}
      </View>
      <OutlinedButton onPress={takeImageHandler} icon={"camera"}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;
