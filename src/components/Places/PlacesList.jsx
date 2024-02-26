import { FlatList } from "react-native";

function PlacesList({ places }) {
  return (
    <FlatList
      data={places}
      key={(place) => place.id}
      renderItem={(itemData) => {}}
    />
  );
}

export default PlacesList;
