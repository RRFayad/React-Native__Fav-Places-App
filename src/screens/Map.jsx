import { useState, useLayoutEffect, useCallback } from "react";
import { Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setSelectedLocation({ latitude, longitude });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location selected", "You have to paci a location first!");
      return;
    }
    navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          onPress={savePickedLocationHandler}
          color={tintColor}
          icon={"bookmark"}
          size={24}
        >
          Save
        </IconButton>
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      className="flex-1"
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="pickedLocation" coordinate={selectedLocation}></Marker>
      )}
    </MapView>
  );
}

export default Map;
