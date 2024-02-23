import Ionicons from "@expo/vector-icons/Ionicons";

type TabBarIconProps = {
  color: string;
  size: number;
  focused: boolean;
  type: "expenses" | "settings" | "add" | "report";
};

export const TabBarIcon = ({ color, size, focused, type }: TabBarIconProps) => {
  let iconName;
  if (type === "expenses") {
    iconName = focused ? "cash" : "cash-outline";
  } else if (type === "settings") {
    iconName = focused ? "settings" : "settings-outline";
  } else if (type === "add") {
    iconName = focused ? "add-circle" : "add-circle-outline";
  } else if (type === "report") {
    iconName = focused ? "bug" : "bug-outline";
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};
