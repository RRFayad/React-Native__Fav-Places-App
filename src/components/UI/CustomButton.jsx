import { Pressable, Text } from "react-native";

function CustomButton({ onPress: pressHandler, children }) {
  return (
    <Pressable
      onPress={pressHandler}
      className="m-1 bg-primary-800 px-3 py-2 active:opacity-70"
    >
      <Text
        className="rounded text-center text-base text-primary-50 shadow-md shadow-black"
        style={{ elevation: 2 }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export default CustomButton;
