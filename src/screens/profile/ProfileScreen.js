import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../auth/AuthContext';
import UserStats from '../../components/profile/UserStats';
import WorkoutHistory from '../../components/profile/WorkoutHistory';

const ProfileScreen = ({ navigation }) => {
  const { userInfo, signOut, authAxios } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const { data } = await authAxios.get(`/users/${userInfo.id}/stats`);
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchUserStats();
    }
  }, [userInfo]);

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>No hay información de usuario</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil de {userInfo.name}</Text>
        <Button 
          mode="contained" 
          onPress={signOut}
          style={styles.logoutButton}
        >
          Cerrar Sesión
        </Button>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <UserStats stats={stats} />
          <WorkoutHistory userId={userInfo.id} authAxios={authAxios} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
  },
});

export default ProfileScreen;