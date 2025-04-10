import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const ObjectivesScreen = () => {
  const { setUserGoal, setUserLevel } = useContext(UserContext);
  const navigation = useNavigation();

  const goals = [
    { id: 'muscle', name: 'Musculación', description: 'Ganar masa muscular' },
    { id: 'calisthenics', name: 'Calistenia', description: 'Entrenamiento con peso corporal' },
    { id: 'home', name: 'Casa', description: 'Rutinas para hacer en casa' },
    { id: 'weight_loss', name: 'Pérdida de peso', description: 'Quemar grasa y definir' },
    { id: 'maintenance', name: 'Mantenimiento', description: 'Mantenerse en forma' }
  ];

  const levels = [
    { id: 'beginner', name: 'Principiante' },
    { id: 'intermediate', name: 'Intermedio' },
    { id: 'advanced', name: 'Avanzado' }
  ];

  const handleSelectGoal = (goal) => {
    setUserGoal(goal);
    // Navegar a la pantalla de selección de nivel o directamente a Home
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Selecciona tu objetivo principal</Text>
      
      {goals.map((goal) => (
        <TouchableOpacity 
          key={goal.id}
          style={styles.card}
          onPress={() => handleSelectGoal(goal.id)}
        >
          <Text style={styles.cardTitle}>{goal.name}</Text>
          <Text style={styles.cardDescription}>{goal.description}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[styles.title, { marginTop: 30 }]}>Nivel de experiencia</Text>
      
      <View style={styles.levelContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level.id}
            style={styles.levelButton}
            onPress={() => setUserLevel(level.id)}
          >
            <Text style={styles.levelText}>{level.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50'
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  levelButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center'
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default ObjectivesScreen;