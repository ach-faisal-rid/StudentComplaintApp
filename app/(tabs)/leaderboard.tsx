import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { getLeaderboard } from '../../services/userService';
import type { User } from '../../services/userService';

// Using User interface from userService

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setLeaderboard(data.leaderboard);
      setCurrentUser(data.currentUser);
    } catch (error: any) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadLeaderboard();
  };

  const renderLeaderboardItem = ({ item }: { item: User }) => {
    const isCurrentUser = currentUser && item.id === currentUser.id;
    
    return (
      <View style={[styles.leaderboardItem, isCurrentUser && styles.currentUserItem]}>
        <View style={styles.rankContainer}>
          <Text style={[styles.rankText, isCurrentUser && styles.currentUserRankText]}>
            {item.rank}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, isCurrentUser && styles.currentUserName]}>
            {item.name}
          </Text>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={[styles.pointsText, isCurrentUser && styles.currentUserPointsText]}>
            {item.points} pts
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Leaderboard</Text>
      
      {/* Current User Info */}
      {currentUser && (
        <View style={styles.currentUserCard}>
          <Text style={styles.currentUserTitle}>Your Position</Text>
          <View style={styles.currentUserDetails}>
            <Text style={styles.currentUserRank}>#{currentUser.rank}</Text>
            <Text style={styles.currentUserNameLarge}>{currentUser.name}</Text>
            <Text style={styles.currentUserPoints}>{currentUser.points} points</Text>
          </View>
        </View>
      )}
      
      {/* Leaderboard List */}
      <FlatList
        data={leaderboard}
        renderItem={renderLeaderboardItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No leaderboard data available</Text>
          </View>
        }
      />
      
      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>How It Works</Text>
        <Text style={styles.infoText}>• Earn points by submitting complaints</Text>
        <Text style={styles.infoText}>• Get bonus points when your complaints are resolved</Text>
        <Text style={styles.infoText}>• Top 10 students are featured on this leaderboard</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  currentUserCard: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentUserTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  currentUserDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentUserRank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  currentUserNameLarge: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  currentUserPoints: {
    fontSize: 16,
    color: 'white',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  currentUserItem: {
    backgroundColor: '#e8f4ff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  currentUserRankText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  currentUserName: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  pointsContainer: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  currentUserPointsText: {
    color: '#0056b3',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default LeaderboardScreen;