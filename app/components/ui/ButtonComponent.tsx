import React from "react"
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"

interface ButtonProps {
  title: string
  onPress: () => void
  borderRadius?: number
  width?: number
  height?: number
  buttonStyle?: ViewStyle
  textStyle?: TextStyle
  style?: ViewStyle
  type?: "primary" | "secondary" | "outlined"
  backgroundColor?: "primary" | "secondary" | "info" | "success" | "warning" | "danger" | "purple" // Added new background colors
}

const ButtonComponent: React.FC<ButtonProps> = ({
  title,
  onPress,
  borderRadius = 5,
  width = 100,
  height = 50,
  buttonStyle,
  textStyle,
  type = "primary",
  backgroundColor = "primary", // Set default background color to "primary"
}) => {
  const getBackgroundColor = () => {
    switch (backgroundColor) {
      case "primary":
        return "#007BFF"
      case "secondary":
        return "#6C757D"
      case "info":
        return "#17A2B8"
      case "success":
        return "#28A745"
      case "warning":
        return "#FFC107"
      case "danger":
        return "#DC3545"
      case "purple":
        return "#800080"
      default:
        return "#007BFF"
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { borderRadius, width, height, backgroundColor: getBackgroundColor() },
        type === "primary" && styles.primaryButton,
        type === "secondary" && styles.secondaryButton,
        type === "outlined" && styles.outlinedButton,
        buttonStyle, // Custom styles for the button
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    // You can add more common styles for the button here (e.g., padding, margin, etc.).
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    // You can add more common styles for the button text here (e.g., fontFamily, fontWeight, etc.).
  },
  primaryButton: {
    // You can add additional styles for primary button if needed
  },
  secondaryButton: {
    // You can add additional styles for secondary button if needed
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "transparent",
  },
})

export default ButtonComponent
