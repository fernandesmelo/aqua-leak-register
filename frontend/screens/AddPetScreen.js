import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { TextInput, Button, Switch } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/styles";

const API_URL = "http://26.146.143.87:3000";

export default function AddPetScreen({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emPerigo, setEmPerigo] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !image) {
      alert("Preencha todos os campos e tire uma foto!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("emPerigo", emPerigo);
    formData.append("photo", {
      uri: image.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      await fetch(`${API_URL}/pets`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigation.navigate("Home");
    } catch (error) {
      alert("Erro ao registrar vazamento!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Local do Vazamento"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Descrição do Vazamento"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        mode="outlined"
        multiline
      />
      <Text>O vazamento é grave?</Text>
      <Switch value={emPerigo} onValueChange={() => setEmPerigo(!emPerigo)} />

      <Button
        mode="outlined"
        onPress={pickImage}
        style={[styles.input, { backgroundColor: "#9381ff" }]}
        icon="camera"
        textColor="#fff"
      >
        Tirar Foto
      </Button>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{
            width: "100%",
            height: 200,
            marginBottom: 10,
            borderRadius: 8,
          }}
        />
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{ backgroundColor: "#ff6f61", marginTop: 10 }}
        textColor="#fff"
      >
        Registrar Vazamento de Água
      </Button>
    </View>
  );
}
