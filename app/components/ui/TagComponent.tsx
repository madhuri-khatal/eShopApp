

import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

interface Iprops {
  text: any
  backgroundColor?: any
  textColor?: any
  borderColor?: any
  onPress?: any
  style?: any
}

const Tag: React.FC<Iprops> = ({
  text,
  backgroundColor,
  textColor,
  borderColor,
  onPress,
  style,
}) => {
  const tagStyle = {
    backgroundColor,
    color: textColor,
    borderColor,
  }

  return (
    <TouchableOpacity
      style={[styles.tag, tagStyle, style]} 
      onPress={onPress}
    >
      <Text style={styles.tagText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderToprighttRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  tagText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
})

export default Tag
