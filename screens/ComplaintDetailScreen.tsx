import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { getComplaint } from '../services/complaintService';

interface Complaint {
  id: number;
  title: string;
  description: string;
  status: string;
  image_path: string | null;
  created_at: string;
  updated_at: string;
}

const ComplaintDetailScreen = ({ route }: any) => {
  const { complaintId } = route.params;
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaint();
  }, []);

  const loadComplaint = async () => {
    try {
      const data = await getComplaint(complaintId);
      setComplaint(data);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load complaint details');
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading complaint details...</Text>
      </View>
    );
  }

  if (!complaint) {
    return (
      <View style={styles.container}>
        <Text>Complaint not found</Text>
      </View>
    );
  }

  // Construct full image URL if image_path exists
  const imageUrl = complaint.image_path 
    ? `${process.env.EXPO_PUBLIC_API_URL || 'http://192.168.57.72:8000'}/storage/${complaint.image_path}`
    : null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{complaint.title}</Text>
        <Text style={[styles.status, getStatusStyle(complaint.status)]}>
          {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{complaint.description}</Text>
      </View>
      
      {/* Image section - only shown to students for privacy */}
      {imageUrl && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evidence Image</Text>
          <Text style={styles.privacyNotice}>This image is only visible to you and school administrators for privacy protection.</Text>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Submitted:</Text>
          <Text style={styles.detailValue}>
            {new Date(complaint.created_at).toLocaleString()}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Last Updated:</Text>
          <Text style={styles.detailValue}>
            {new Date(complaint.updated_at).toLocaleString()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    alignSelf: 'flex-start',
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
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  privacyNotice: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
    padding: 8,
    backgroundColor: '#f0f8ff',
    borderRadius: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default ComplaintDetailScreen;