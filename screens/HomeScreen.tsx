import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getComplaints, getComplaintStats } from '../services/complaintService';
import { getAuthUser } from '../services/authService';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

interface Complaint {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

interface Stats {
  total: number;
  pending: number;
  reviewed: number;
  resolved: number;
}

const HomeScreen = ({ navigation }: any) => {
  const [user, setUser] = useState<any>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    reviewed: 0,
    resolved: 0
  });
  const [gamification, setGamification] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add effect to log stats changes
  useEffect(() => {
    console.log('Stats state updated:', stats);
  }, [stats]);

  // Add effect to log gamification changes
  useEffect(() => {
    console.log('Gamification state updated:', gamification);
  }, [gamification]);

  const loadUserData = async () => {
    console.log('loadUserData called');
    try {
      const userData = await getAuthUser();
      setUser(userData);
      console.log('User data loaded:', userData);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadComplaints = useCallback(async () => {
    console.log('loadComplaints called');
    setLoading(true);
    setError(null);
    try {
      // First check if user is authenticated
      const userData = await getAuthUser();
      setUser(userData);
      console.log('User data loaded in loadComplaints:', userData);
      
      const data = await getComplaints();
      setComplaints(Array.isArray(data) ? data : []);
      console.log('Complaints loaded:', data);
      
      // Load stats and gamification data
      try {
        const statsData = await getComplaintStats();
        console.log('Stats data received:', statsData);
        
        if (statsData && statsData.stats) {
          console.log('Setting stats state:', statsData.stats);
          setStats(statsData.stats);
        } else {
          console.log('No stats data received, using defaults');
          setStats({
            total: 0,
            pending: 0,
            reviewed: 0,
            resolved: 0
          });
        }
        
        if (statsData && statsData.gamification) {
          console.log('Setting gamification state:', statsData.gamification);
          setGamification(statsData.gamification);
        } else {
          console.log('No gamification data received');
        }
      } catch (statsError: any) {
        console.error('Error loading stats:', statsError);
        setStats({
          total: 0,
          pending: 0,
          reviewed: 0,
          resolved: 0
        });
        
        if (statsError.response?.status === 401) {
          setError('Authentication required. Please log in again.');
        } else {
          setError('Failed to load statistics. Showing default values.');
        }
      }
    } catch (error: any) {
      console.error('Error loading data:', error);
      
      if (error.response?.status === 401) {
        setError('Authentication required. Please log in again.');
      } else {
        setError('Failed to load data. Please try again later.');
      }
      
      setComplaints([]);
      setStats({
        total: 0,
        pending: 0,
        reviewed: 0,
        resolved: 0
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect triggered');
      loadUserData();
      loadComplaints();
    }, [loadComplaints])
  );

  const renderComplaint = ({ item }: { item: Complaint }) => (
    <TouchableOpacity 
      style={styles.complaintCard}
      onPress={() => navigation.navigate('ComplaintDetail', { complaintId: item.id })}
    >
      <Text style={styles.complaintTitle}>{item.title}</Text>
      <Text style={styles.complaintDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.complaintFooter}>
        <Text style={[styles.status, getStatusStyle(item.status)]}>
          {getStatusText(item.status)}
        </Text>
        <Text style={styles.date}>
          {formatDate(item.created_at)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Menunggu';
      case 'reviewed':
        return 'Dalam Proses';
      case 'resolved':
        return 'Selesai';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return styles.statusPending;
      case 'reviewed':
        return styles.statusReviewed;
      case 'resolved':
        return styles.statusResolved;
      default:
        return styles.statusPending;
    }
  };

  const renderStats = () => {
    console.log('Rendering stats:', stats);
    // Always render the stats panel, even if data hasn't loaded yet
    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.total !== undefined ? stats.total : '0'}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#FF9500' }]}>{stats.pending !== undefined ? stats.pending : '0'}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#34C759' }]}>{stats.reviewed !== undefined ? stats.reviewed : '0'}</Text>
          <Text style={styles.statLabel}>Reviewed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#007AFF' }]}>{stats.resolved !== undefined ? stats.resolved : '0'}</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
      </View>
    );
  };

  const renderGamification = () => {
    console.log('Rendering gamification, user:', user, 'role:', user?.role, 'gamification:', gamification);
    // Only show gamification for students
    if (!user || user.role !== 'student' || !gamification) {
      console.log('Not rendering gamification - user not student or no gamification data');
      return null;
    }
    
    // Determine achievements based on level and points
    const achievements = [];
    if (gamification.level >= 1) achievements.push({ name: 'First Step', icon: 'directions-walk', color: '#4CAF50' });
    if (gamification.level >= 3) achievements.push({ name: 'Explorer', icon: 'explore', color: '#2196F3' });
    if (gamification.level >= 5) achievements.push({ name: 'Champion', icon: 'emoji-events', color: '#FF9800' });
    if (gamification.level >= 10) achievements.push({ name: 'Legend', icon: 'star', color: '#9C27B0' });
    
    return (
      <View style={styles.gamificationContainer}>
        <View style={styles.gamificationCard}>
          <View style={styles.gamificationHeader}>
            <MaterialIcons name="emoji-events" size={24} color="#FFD700" />
            <Text style={styles.gamificationTitle}>Your Progress</Text>
            <MaterialIcons name="emoji-events" size={24} color="#FFD700" />
          </View>
          <View style={styles.levelContainer}>
            <Text style={styles.levelLabel}>Level</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelValue}>{gamification.level}</Text>
            </View>
          </View>
          <View style={styles.pointsContainer}>
            <MaterialIcons name="stars" size={20} color="#34C759" />
            <Text style={styles.pointsLabel}>Total Points</Text>
            <Text style={styles.pointsValue}>{gamification.total_points}</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${Math.min(100, (gamification.total_points % 100))}%` }]} />
          </View>
          <View style={styles.nextLevelContainer}>
            <MaterialIcons name="trending-up" size={16} color="#007AFF" />
            <Text style={styles.pointsToNextLevel}>
              {gamification.points_to_next_level} points to next level
            </Text>
          </View>
          
          {/* Achievements */}
          {achievements.length > 0 && (
            <View style={styles.achievementsContainer}>
              <Text style={styles.achievementsTitle}>Achievements</Text>
              <View style={styles.achievementsList}>
                {achievements.map((achievement, index) => (
                  <View key={index} style={styles.achievementItem}>
                    <MaterialIcons name={achievement.icon as any} size={20} color={achievement.color} />
                    <Text style={styles.achievementName}>{achievement.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Complaints</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateComplaint')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* Stats Section */}
      {renderStats()}
      
      {/* Refresh Button */}
      <TouchableOpacity 
        style={styles.refreshButton}
        onPress={loadComplaints}
        disabled={loading}
      >
        <Text style={styles.refreshButtonText}>
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </Text>
      </TouchableOpacity>
      
      {/* Gamification Section - Only for students */}
      {renderGamification()}
      
      {loading ? (
        <Text style={styles.loadingText}>Loading complaints...</Text>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadComplaints}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
          {/* Add a button to go to login if authentication failed */}
          {error.includes('Authentication') && (
            <TouchableOpacity 
              style={[styles.retryButton, { backgroundColor: '#FF3B30', marginTop: 10 }]} 
              onPress={() => navigation.replace('Login')}
            >
              <Text style={styles.retryButtonText}>Go to Login</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : complaints.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No complaints yet</Text>
          <Text style={styles.emptySubtext}>Tap the + button to create your first complaint</Text>
        </View>
      ) : (
        <FlatList
          data={complaints}
          renderItem={renderComplaint}
          keyExtractor={(item) => item.id.toString()}
          refreshing={loading}
          onRefresh={loadComplaints}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  refreshButton: {
    margin: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },
  complaintCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  complaintTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  complaintDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  complaintFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusPending: {
    backgroundColor: '#FFEAA7',
    color: '#D35400',
  },
  statusReviewed: {
    backgroundColor: '#74B9FF',
    color: '#0984E3',
  },
  statusResolved: {
    backgroundColor: '#00B894',
    color: '#006644',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  gamificationContainer: {
    padding: 20,
    paddingTop: 0,
  },
  gamificationCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gamificationHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  gamificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  levelLabel: {
    fontSize: 16,
    color: '#666',
  },
  levelBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  pointsLabel: {
    fontSize: 16,
    color: '#666',
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34C759',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  nextLevelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  pointsToNextLevel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  achievementsContainer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  achievementsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  achievementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 3,
  },
  achievementName: {
    fontSize: 12,
    marginLeft: 5,
    color: '#333',
  },
});

export default HomeScreen;