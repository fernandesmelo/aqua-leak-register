import React, { useState } from "react";
import { View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import addLeakStyles from "../styles/addLeakStyles";

const API_URL = "http://SEU_BACKEND_URL:3000";

export default function AddLeakScreen({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("photo", {
        uri: image.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });
    }
    await fetch(`${API_URL}/leaks`, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
        style={{ marginBottom: 10 }}
      />
      <Button
        mode="outlined"
        onPress={pickImage}
        style={addLeakStyles.cameraButton}
        icon="camera"
        textColor="#fff"
      >
        Tirar Foto
      </Button>
      {image && (
        <Image source={{ uri: image.uri }} style={addLeakStyles.image} />
      )}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={addLeakStyles.submitButton}
        textColor="#fff"
      >
        Registrar Vazamento de Água
      </Button>
    </View>
  );
}