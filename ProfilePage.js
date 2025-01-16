import React, { useState, useEffect } from 'react';
import { TextInput, Button, AsyncStorage, View, Text } from 'react-native';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('bio', bio);
      await AsyncStorage.setItem('profilePic', profilePic);
      alert('Profile saved!');
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const loadProfile = async () => {
    const savedName = await AsyncStorage.getItem('name');
    const savedBio = await AsyncStorage.getItem('bio');
    const savedProfilePic = await AsyncStorage.getItem('profilePic');
    
    if (savedName) setName(savedName);
    if (savedBio) setBio(savedBio);
    if (savedProfilePic) setProfilePic(savedProfilePic);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Profile Picture URL"
        value={profilePic}
        onChangeText={setProfilePic}
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <Button title="Save Profile" onPress={saveProfile} />
      <Text style={{ marginTop: 20 }}>Name: {name}</Text>
      <Text>Bio: {bio}</Text>
      {profilePic && <Text>Profile Picture URL: {profilePic}</Text>}
    </View>
  );
};

export default ProfilePage;
