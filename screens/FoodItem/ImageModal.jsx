import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from "react-native";

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <Modal visible={imageUrl !== null} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height - 80,
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default ImageModal;
