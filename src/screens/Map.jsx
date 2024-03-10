import { useState, useLayoutEffect, useCallback } from "react";
import { Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation, route }) {
  const initialLocation = route.params
    ? { lat: route.params.initialLat, lng: route.params.initialLng }
    : null;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (initialLocation) {
      return;
    }
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
    if (!initialLocation) {
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
    }
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      className="flex-1"
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="pickedLocation"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        ></Marker>
      )}
    </MapView>
  );
}

export default Map;
