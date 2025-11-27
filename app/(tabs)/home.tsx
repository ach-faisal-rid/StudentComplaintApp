import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { getComplaints, getComplaintStats } from '../../services/complaintService';
import MilestonesLink from '../../components/MilestonesLink';

interface Complaint {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

interface ComplaintStats {
  total: number;
  pending: number;
  reviewed: number;
  resolved: number;
}

const HomeScreen = () => {
  const router = useRouter();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [stats, setStats] = useState<ComplaintStats>({
    total: 0,
    pending: 0,
    reviewed: 0,
    resolved: 0
  });
  const [loading, setLoading] = useState(false);

  // Add effect to log stats changes
  useEffect(() => {
    console.log('Stats state updated:', stats);
  }, [stats]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [complaintsData, statsData] = await Promise.all([
        getComplaints(),
        getComplaintStats()
      ]);
      console.log('Complaints data:', complaintsData);
      console.log('Stats data:', statsData);
      setComplaints(complaintsData);
      // Extract the stats object from the response
      const statsObject = statsData.stats || {
        total: 0,
        pending: 0,
        reviewed: 0,
        resolved: 0
      };
      console.log('Setting stats:', statsObject);
      setStats(statsObject);
    } catch (error: any) {
      console.error('Error loading dashboard data:', error);
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const renderComplaint = ({ item }: { item: Complaint }) => (
    <TouchableOpacity 
      style={styles.complaintCard}
      onPress={() => router.push({ pathname: '/complaint-detail', params: { complaintId: item.id.toString() } })}
    >
      <Text style={styles.complaintTitle}>{item.title}</Text>
      <Text style={styles.complaintDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.complaintFooter}>
        <Text style={[styles.status, getStatusStyle(item.status)]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

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

  const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => {
    console.log(`StatCard - ${title}:`, value);
    return (
      <View style={[styles.statCard, { borderLeftColor: color }]}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>
      
      {/* Statistics Section */}
      <View style={styles.statsContainer}>
        <StatCard title="Total" value={stats.total} color="#3498db" />
        <StatCard title="Pending" value={stats.pending} color="#f1c40f" />
        <StatCard title="Reviewed" value={stats.reviewed} color="#3498db" />
        <StatCard title="Resolved" value={stats.resolved} color="#2ecc71" />
      </View>
      
      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/create-complaint')}
          >
            <Text style={styles.actionButtonText}>Create Complaint</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryActionButton]}
            onPress={loadDashboardData}
          >
            <Text style={styles.actionButtonText}>Refresh Data</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Milestones Link */}
      <MilestonesLink />
      
      {/* Complaints Section */}
      <View style={styles.complaintsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Complaints</Text>
          <TouchableOpacity onPress={loadDashboardData}>
            <Text style={styles.refreshLink}>Refresh</Text>
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <Text style={styles.loadingText}>Loading complaints...</Text>
        ) : complaints.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No complaints yet</Text>
            <Text style={styles.emptySubtext}>Create your first complaint using the button above</Text>
          </View>
        ) : (
          <FlatList
            data={complaints}
            renderItem={renderComplaint}
            keyExtractor={(item) => item.id.toString()}
            refreshing={loading}
            onRefresh={loadDashboardData}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    margin: '1%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
  },
  quickActionsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  secondaryActionButton: {
    backgroundColor: '#95a5a6',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  complaintsSection: {
    backgroundColor: '#fff',
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  refreshLink: {
    color: '#3498db',
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 10,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  emptyContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  complaintCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
});

export default HomeScreen;