import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type Props = {
  bgColor?: string;
  color: string;
  onClick?: () => void;
  isDestructive?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
};
export const Button: React.FC<Props> = ({
  bgColor,
  color,
  children,
  icon,
  onClick,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: bgColor ? bgColor : "#fff",
          paddingRight: 15,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
        onPress={onClick}
        disabled={!onClick}
      >
        {icon}
        <Text
          style={{
            color: color,
            fontSize: 18,
            fontWeight: "400",
          }}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
