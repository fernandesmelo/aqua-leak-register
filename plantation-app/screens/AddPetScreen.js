import React, { useState } from 'react';
import { View, Button, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function AddPetScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);
  const [location, setLocation] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
    if (!result.cancelled) setFoto(result.uri);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    }
  };

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('latitude', location.latitude);
    formData.append('longitude', location.longitude);
    formData.append('foto', {
      uri: foto,
      name: 'pet.jpg',
      type: 'image/jpg',
    });

    await fetch('http://SEU_IP_LOCAL:3000/pets', {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    navigation.goBack();
  };

  return (
    <View>
      <TextInput placeholder="Nome do Pet" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
      <Button title="Tirar Foto" onPress={pickImage} />
      {foto && <Image source={{ uri: foto }} style={{ width: 200, height: 200 }} />}
      <Button title="Pegar Localização" onPress={getLocation} />
      <Button title="Salvar" onPress={handleSubmit} disabled={!foto || !location} />
    </View>
  );
}