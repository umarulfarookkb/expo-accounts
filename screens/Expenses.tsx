import { Alert, ScrollView, Text, View } from "react-native";
import { useExpenseStore } from "../store";
import { theme } from "../theme";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export const Expenses = () => {
  const expense = useExpenseStore((state) => state.expense);
  const setExpense = useExpenseStore((state) => state.setExpense);
  const getTotalExpense = useExpenseStore((state) => state.getTotalExpense);

  const deleteExpenses = (id) => {
    const updatedExpenses = expense.filter((expense) => expense.id !== id);
    setExpense(updatedExpenses);
  };
  return (
    <View>
      {expense.length !== 0 && (
        <Text style={{ fontSize: 16, fontWeight: "500", margin: 20 }}>
          Overall, expense{" "}
          <Text style={{ fontSize: 16, fontWeight: "500", color: "red" }}>
            ₹{getTotalExpense()}
          </Text>
        </Text>
      )}
      <ScrollView style={{ height: 600 }}>
        <View
          style={{
            margin: 20,
            display: "flex",
            gap: 5,
            borderRadius: 11,
            overflow: "hidden",
          }}
        >
          {expense.map((item) => (
            <Swipeable
              key={item.id}
              renderRightActions={() => {
                return (
                  <View
                    style={{
                      backgroundColor: theme.colors.error,
                      width: 60,
                    }}
                  >
                    <RectButton
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        Alert.alert(
                          "Are you sure?",
                          "This action cannot be undone",
                          [
                            {
                              text: "Cancel",
                              onPress: () => {},
                              style: "cancel",
                            },
                            {
                              text: "Delete",
                              style: "destructive",
                              onPress: () => {
                                deleteExpenses(item.id);
                              },
                            },
                          ],
                          {
                            userInterfaceStyle: "light",
                          }
                        );
                      }}
                    >
                      <EvilIcons name="trash" size={25} color="white" />
                    </RectButton>
                  </View>
                );
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme.colors.textPrimary,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {item.description}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {item.amount} ₹
                </Text>
              </View>
            </Swipeable>
          ))}
          {expense.length === 0 && (
            <Text
              style={{ display: "flex", textAlign: "center", fontSize: 14 }}
            >
              No expenses yet.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
