import React, { useEffect, useState } from 'react';
import { View, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/styles';

const API_URL = 'http://26.146.143.87:3000';

export default function AddPetScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } else {
        Alert.alert('Permissão de localização negada');
      }
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão para acessar a câmera foi negada!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFoto(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);

    if (foto) {
      formData.append('foto', {
        uri: foto.uri,
        name: 'pet.jpg',
        type: 'image/jpeg',
      });
    }

    if (location) {
      formData.append('latitude', location.latitude.toString());
      formData.append('longitude', location.longitude.toString());
    }

    try {
      await fetch(`${API_URL}/pets`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro ao salvar pet', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome do Pet"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        mode="outlined"
        multiline
      />
      <Button
        mode="outlined"
        onPress={pickImage}
        style={styles.input}
        icon="camera"
      >
        Tirar Foto
      </Button>

      {foto && (
        <Image
          source={{ uri: foto.uri }}
          style={{ width: '100%', height: 200, marginBottom: 10, borderRadius: 8 }}
        />
      )}

      <Button mode="contained" onPress={handleSubmit}>
        Salvar
      </Button>
    </View>
  );
}