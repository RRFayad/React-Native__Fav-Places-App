import { insertPlace } from "../../util/database";
import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({ navigation }) {
  const createPlaceHandler = async (place) => {
    console.log(place);
    await insertPlace(place);

    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
