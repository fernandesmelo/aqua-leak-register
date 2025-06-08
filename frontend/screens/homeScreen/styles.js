import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  cardActions: {
    justifyContent: "flex-end",
    paddingHorizontal: 8,
  },
  fabContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
  },
});