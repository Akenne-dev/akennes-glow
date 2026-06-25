import React, { useEffect, useRef } from "react";
import { Animated, Modal, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const DISPLAY_DURATION = 3000;
const ANIM_DURATION = 280;
const HIDDEN_OFFSET = -150;

export default function Toast({ visible, message, variant = "added", onHide }) {
  const translateY = useRef(new Animated.Value(HIDDEN_OFFSET)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.timing(translateY, {
      toValue: 0,
      duration: ANIM_DURATION,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: HIDDEN_OFFSET,
        duration: ANIM_DURATION,
        useNativeDriver: true,
      }).start(() => onHide?.());
    }, DISPLAY_DURATION);

    return () => clearTimeout(timer);
  }, [visible, message]);

  if (!visible) return null;

  return (
    <Modal transparent visible animationType="none" statusBarTranslucent>
      <View style={styles.overlay} pointerEvents="box-none">
        <Animated.View style={[styles.toast, { transform: [{ translateY }] }]}>
          <Ionicons
            name={variant === "removed" ? "heart-dislike" : "heart"}
            size={18}
            color="#F83758"
          />
          <Text style={styles.message}>{message}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  toast: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#2D2D2D",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  message: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
