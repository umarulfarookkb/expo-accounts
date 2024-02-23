import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { theme } from "../theme";
import { useExpenseStore } from "../store";

export const Add = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const expense = useExpenseStore((state) => state.expense);
  const setExpense = useExpenseStore((state) => state.setExpense);
  return (
    <View
      style={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        margin: 50,
      }}
    >
      <TextInput
        placeholder="Description"
        placeholderTextColor="rgba(0,0,0,.4)"
        onChange={(event) => setDescription(event.nativeEvent.text)}
        value={description}
        style={{
          color: "black",
          height: 50,
          fontSize: 18,
          fontWeight: "500",
          borderBottomWidth: 2,
          borderColor: "rgba(0,0,0,.3)",
          borderRadius: 10,
          paddingLeft: 8,
        }}
      />
      <TextInput
        placeholder="Amount"
        placeholderTextColor="rgba(0,0,0,.4)"
        keyboardType="numeric"
        onChange={(event) => setAmount(event.nativeEvent.text)}
        value={amount}
        style={{
          color: "black",
          fontSize: 16,
          height: 50,
          fontWeight: "400",
          borderColor: "rgba(0,0,0,.3)",
          borderBottomWidth: 2,
          borderRadius: 10,
          paddingLeft: 8,
        }}
      />
      <View
        style={{
          marginTop: 20,
          backgroundColor: theme.colors.notification,
          borderRadius: 20,
          margin: 10,
        }}
      >
        <Button
          title="Create"
          color={theme.colors.text}
          onPress={() => {
            const newExpense = {
              id: Math.random().toString(),
              description: description,
              amount: Number(amount),
            };
            setExpense([...expense, newExpense]);
            setDescription("");
            setAmount("");
            navigation.navigate("Expenses");
          }}
        />
      </View>
    </View>
  );
};
