import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress: pressHandler }) {
  return (
    <Pressable onPress={pressHandler}>
      <Ionicons
        name={icon}
        size={size}
        color={color}
        className=" items-center justify-center p-2 active:opacity-70"
      />
    </Pressable>
  );
}

export default IconButton;
