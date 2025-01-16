// screens/SavedArticlesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { firestore } from '../firebase';

const SavedArticlesScreen = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('newsArticles')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setSavedArticles(snapshot.docs.map((doc) => doc.data()));
      });

    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.article}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={savedArticles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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

export default SavedArticlesScreen;
