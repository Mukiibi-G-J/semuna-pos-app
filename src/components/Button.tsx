import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import React from "react";
import { COLORS } from "../constants";
interface ButtonProps extends TouchableOpacityProps {
  title: string;
}
const PrimaryButton: React.FC<ButtonProps> = ({ title, onPress, ...props }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} {...props}>
      <View style={style.btnContainer}>
        <Text style={style.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const SecondaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.btnContainer, backgroundColor: COLORS.white }}>
        <Text style={{ ...style.title, color: COLORS.primary }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export { PrimaryButton, SecondaryButton };

const style = StyleSheet.create({
  title: { color: COLORS.white, fontWeight: "bold", fontSize: 18 },
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
