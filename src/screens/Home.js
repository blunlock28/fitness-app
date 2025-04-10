import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext';
import { motivationalQuotes } from '../data/quotes';
import { dailyRoutines } from '../data/routines';
import { dailyMeals } from '../data/meals';

const HomeScreen = () => {
  const { userGoal, userLevel } = useContext(UserContext);
  const [dailyQuote, setDailyQuote] = useState('');
  const [todayRoutine, setTodayRoutine] = useState(null);
  const [todayMeal, setTodayMeal] = useState(null);

  // Obtener datos según el objetivo y nivel del usuario
  useEffect(() => {
    // Obtener frase motivacional aleatoria
    const goalQuotes = motivationalQuotes[userGoal] || motivationalQuotes.default;
    const randomQuote = goalQuotes[Math.floor(Math.random() * goalQuotes.length)];
    setDailyQuote(randomQuote);

    // Obtener rutina diaria
    const goalRoutines = dailyRoutines[userGoal]?.[userLevel] || dailyRoutines.default.beginner;
    setTodayRoutine(goalRoutines[Math.floor(Math.random() * goalRoutines.length)]);

    // Obtener plan de comidas
    const goalMeals = dailyMeals[userGoal] || dailyMeals.default;
    setTodayMeal(goalMeals[Math.floor(Math.random() * goalMeals.length)]);
  }, [userGoal, userLevel]);

  const getGoalTitle = () => {
    const titles = {
      muscle: 'Musculación',
      calisthenics: 'Calistenia',
      home: 'Ejercicio en Casa',
      weight_loss: 'Pérdida de Peso',
      maintenance: 'Mantenimiento'
    };
    return titles[userGoal] || 'Fitness Personalizado';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tu Plan de {getGoalTitle()}</Text>
        <Text style={styles.subtitle}>Nivel: {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)}</Text>
      </View>

      {/* Frase Motivacional */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Frase del Día</Text>
        <Text style={styles.quoteText}>"{dailyQuote}"</Text>
      </View>

      {/* Rutina Diaria */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Rutina de Hoy</Text>
        {todayRoutine && (
          <>
            <Text style={styles.routineTitle}>{todayRoutine.name}</Text>
            <View style={styles.exerciseContainer}>
              {todayRoutine.exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseItem}>
                  <Text style={styles.exerciseName}>• {exercise.name}</Text>
                  <Text style={styles.exerciseDetails}>
                    {exercise.sets} sets × {exercise.reps} reps
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>

      {/* Comida del Día */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Plan de Alimentación</Text>
        {todayMeal && (
          <>
            <Text style={styles.mealTitle}>{todayMeal.name}</Text>
            <View style={styles.mealSection}>
              <Text style={styles.mealSubtitle}>Desayuno:</Text>
              <Text style={styles.mealText}>{todayMeal.breakfast}</Text>
            </View>
            <View style={styles.mealSection}>
              <Text style={styles.mealSubtitle}>Almuerzo:</Text>
              <Text style={styles.mealText}>{todayMeal.lunch}</Text>
            </View>
            <View style={styles.mealSection}>
              <Text style={styles.mealSubtitle}>Cena:</Text>
              <Text style={styles.mealText}>{todayMeal.dinner}</Text>
            </View>
            {todayMeal.snacks && (
              <View style={styles.mealSection}>
                <Text style={styles.mealSubtitle}>Snacks:</Text>
                <Text style={styles.mealText}>{todayMeal.snacks}</Text>
              </View>
            )}
          </>
        )}
      </View>

      {/* Botón para cambiar rutina */}
      <TouchableOpacity 
        style={styles.refreshButton}
        onPress={() => {
          // Volver a cargar los datos aleatorios
          const goalRoutines = dailyRoutines[userGoal]?.[userLevel] || dailyRoutines.default.beginner;
          setTodayRoutine(goalRoutines[Math.floor(Math.random() * goalRoutines.length)]);
        }}
      >
        <Text style={styles.refreshButtonText}>Cambiar Rutina</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    lineHeight: 24,
  },
  routineTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  exerciseContainer: {
    marginTop: 10,
  },
  exerciseItem: {
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#34495e',
  },
  exerciseDetails: {
    fontSize: 13,
    color: '#7f8c8d',
    marginLeft: 15,
    marginTop: 3,
  },
  mealTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  mealSection: {
    marginBottom: 12,
  },
  mealSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#e74c3c',
  },
  mealText: {
    fontSize: 14,
    color: '#34495e',
    marginTop: 3,
    lineHeight: 20,
  },
  refreshButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;