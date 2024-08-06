import React, { ReactNode } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { SIZES } from "appTheme";

interface SectionProps {
  title: string;
  onPress: () => void;
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  onPress,
  children,
}) => {
  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>

        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
            Show All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {children}
    </View>
  );
};
