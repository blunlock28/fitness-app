import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const UserStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <Card style={styles.card}>
      <Card.Title title="Estadísticas" />
      <Card.Content>
        <View style={styles.statRow}>
          <Text>Entrenamientos completados:</Text>
          <Text style={styles.statValue}>{stats.workoutsCompleted}</Text>
        </View>
        <View style={styles.statRow}>
          <Text>Horas entrenadas:</Text>
          <Text style={styles.statValue}>{stats.hoursTrained}</Text>
        </View>
        <View style={styles.statRow}>
          <Text>Peso actual:</Text>
          <Text style={styles.statValue}>{stats.currentWeight} kg</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  statValue: {
    fontWeight: 'bold',
  },
});

export default UserStats;