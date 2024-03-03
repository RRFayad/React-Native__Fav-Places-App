import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../util/colors";

function OutlinedButton({ icon, onPress: pressHandler, children }) {
  return (
    <Pressable
      className="m-1 flex-row items-center justify-center border border-primary-500 px-3 py-[6px] active:opacity-70"
      onPress={pressHandler}
    >
      <Ionicons name={icon} size={18} color={Colors.primary500} />
      <Text className="ml-2 text-primary-500">{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;
