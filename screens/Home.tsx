import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Expenses } from "./Expenses";
import { Settings } from "./Settings";
import { Add } from "./Add";
import { Report } from "./Report";
import { TabBarIcon } from "../components/TabBarIcon";
// import { Button, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "../theme";
import { Button } from "../components/Button";
// import BottomSheet from '@gorhom/bottom-sheet';

const Tab = createBottomTabNavigator();

export const Home = () => {
  //   const reportsSheetRef = useRef<BottomSheet>(null);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
        },
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Tab.Screen
        name="Expenses"
        component={Expenses}
        options={({ navigation }) => ({
          tabBarIcon: (props) => <TabBarIcon {...props} type="expenses" />,
          headerRight: () => (
            <Button
              color={theme.colors.notification}
              onClick={() => navigation.navigate("Add Expenses")}
              icon={
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color={theme.colors.notification}
                />
              }
            >
              Add
            </Button>
          ),
        })}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type="settings" />,
        }}
        name="Settings"
        component={Settings}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type="report" />,
        }}
        name="Report"
        component={Report}
      />
    </Tab.Navigator>
  );
};
