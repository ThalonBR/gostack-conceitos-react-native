import React, {useEffect, useState} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from './services/api'
export default function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleLikeRepository(id) {
    
    const repoIndex = repositories.findIndex(repo => repo.id === id);
    let repoCopy = JSON.parse(JSON.stringify(repositories));

    api.post(`/repositories/${id}/like`).then(item =>{

      repoCopy[repoIndex].likes = item.data.likes; 
      setRepositories(repoCopy);
    });
  }


  useEffect(() =>{
  api.get('/repositories').then(response => {
    setRepositories(response.data);
  })
  },[like])



  return (

    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {repositories.map(repository => (
          <View key={String(repository.id)} style={styles.repositoryContainer}>
          <Text style={styles.repository}>{repository.title}</Text>

          <View style={styles.techsContainer}>
            {repository.techs.map(repo => (
              <Text key={repo} style={styles.tech}>
              {repo}
            </Text>
            ))}
            
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-${repository.id}`}
            >
              {repository.likes} curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            testID={`like-button-${repository.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
        ))}
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    borderRadius: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
