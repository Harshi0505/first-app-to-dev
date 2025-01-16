// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { firestore } from '../firebase';

const API_KEY = 'YOUR_NEWSAPI_KEY';
const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + API_KEY;

const HomeScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const saveArticle = (article) => {
    firestore.collection('newsArticles').add({
      ...article,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.article}>
      <Text>{item.title}</Text>
      <Button title="Save" onPress={() => saveArticle(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  article: {
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default HomeScreen;
