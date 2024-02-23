import React, { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { theme } from "../theme";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { CategoryRow } from "../components/CategoryRow";
import { useCategoryStore } from "../store";

export const Categories = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(theme.colors.primary);
  const [newName, setNewName] = useState("");

  const categories = useCategoryStore((state) => state.categories);
  const setCategories = useCategoryStore((state) => state.setCategories);

  const onSelectColor = (hex: string) => {
    setSelectedColor(hex);
  };

  const createCategory = () => {
    if (newName.length === 0) {
      return;
    }
    const newCategory = {
      id: Math.random().toString(),
      color: selectedColor,
      name: newName,
    };
    setCategories([...categories, newCategory]);
    setNewName("");
    setSelectedColor(theme.colors.primary);
  };

  const deleteCategory = (id) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={112}
        style={{ margin: 16, flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              borderRadius: 11,
              overflow: "hidden",
            }}
          >
            {categories.map((category) => (
              <Swipeable
                key={category.id}
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
                                  deleteCategory(category.id);
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
                <CategoryRow color={category.color} name={category.name} />
              </Swipeable>
            ))}
            {categories.length === 0 && (
              <Text
                style={{ display: "flex", textAlign: "center", fontSize: 14 }}
              >
                No categories yet.
              </Text>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            paddingVertical: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowColorPicker(!showColorPicker)}
          >
            <View
              style={{
                backgroundColor: selectedColor,
                width: 32,
                height: 32,
                borderRadius: 16,
                borderWidth: 3,
                borderColor: "white",
              }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Category name"
            placeholderTextColor="rgba(0,0,0,.3)"
            onChange={(event) => setNewName(event.nativeEvent.text)}
            value={newName}
            style={{
              color: "black",
              height: 40,
              borderColor: "rgba(0,0,0,.3)",
              borderWidth: 1,
              flex: 1,
              borderRadius: 8,
              paddingLeft: 8,
              marginLeft: 16,
            }}
          />
          <TouchableOpacity
            onPress={createCategory}
            style={{
              padding: 12,
            }}
          >
            <FontAwesome name="send" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        transparent
        visible={showColorPicker}
        animationType="fade"
        onRequestClose={() => setShowColorPicker(false)}
      >
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              padding: 24,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.colors.card,
              overflow: "hidden",
              borderRadius: 12,
            }}
          >
            <ColorPicker
              hideSliders
              color={selectedColor}
              onColorChange={(color) => onSelectColor(fromHsv(color))}
              style={{ width: "100%", height: 300 }}
            />
            <Button onPress={() => setShowColorPicker(false)} title="Select" />
          </View>
        </View>
      </Modal>
    </>
  );
};
