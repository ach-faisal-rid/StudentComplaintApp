import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface Milestone {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  estimatedDate?: string;
}

const MilestonesScreen = () => {
  const router = useRouter();

  const milestones: Milestone[] = [
    {
      id: 1,
      title: "Sistem Pengaduan Dasar",
      description: "Platform untuk siswa mengirimkan pengaduan kepada pihak sekolah",
      status: 'completed',
      estimatedDate: 'Q4 2024'
    },
    {
      id: 2,
      title: "Notifikasi Real-time",
      description: "Notifikasi langsung ketika status pengaduan berubah",
      status: 'completed',
      estimatedDate: 'Q1 2025'
    },
    {
      id: 3,
      title: "Manajemen Akun",
      description: "Fitur lengkap untuk mengelola profil pengguna",
      status: 'completed',
      estimatedDate: 'Q2 2025'
    },
    {
      id: 4,
      title: "Statistik Pengaduan",
      description: "Dashboard analitik untuk melihat tren pengaduan",
      status: 'completed',
      estimatedDate: 'Q3 2025'
    },
    {
      id: 5,
      title: "Gamifikasi & Leaderboard",
      description: "Sistem poin dan leaderboard untuk meningkatkan partisipasi siswa",
      status: 'completed',
      estimatedDate: 'Q3 2025'
    },
    {
      id: 6,
      title: "Fitur Kamera & Galeri",
      description: "Siswa dapat mengambil foto langsung atau memilih dari galeri saat membuat pengaduan",
      status: 'completed',
      estimatedDate: 'Q3 2025'
    },
    {
      id: 7,
      title: "Tampilan Gambar di Detail",
      description: "Gambar pengaduan ditampilkan dalam detail dengan perlindungan privasi",
      status: 'completed',
      estimatedDate: 'Q3 2025'
    },
    {
      id: 8,
      title: "Integrasi Media Sosial",
      description: "Berbagi pengalaman dan solusi melalui platform sosial",
      status: 'planned',
      estimatedDate: 'Q4 2025'
    },
    {
      id: 9,
      title: "AI Assistant",
      description: "Asisten berbasis AI untuk membantu pengguna membuat pengaduan",
      status: 'planned',
      estimatedDate: 'Q1 2026'
    },
    {
      id: 10,
      title: "Multi-bahasa",
      description: "Dukungan untuk beberapa bahasa dalam aplikasi",
      status: 'planned',
      estimatedDate: 'Q2 2026'
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { text: 'Selesai', color: '#2ecc71' };
      case 'in-progress':
        return { text: 'Sedang Dikerjakan', color: '#f39c12' };
      case 'planned':
        return { text: 'Direncanakan', color: '#3498db' };
      default:
        return { text: 'Direncanakan', color: '#3498db' };
    }
  };

  const renderMilestone = (milestone: Milestone) => {
    const statusInfo = getStatusInfo(milestone.status);
    
    return (
      <View key={milestone.id} style={styles.milestoneCard}>
        <View style={styles.milestoneHeader}>
          <Text style={styles.milestoneTitle}>{milestone.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
            <Text style={styles.statusText}>{statusInfo.text}</Text>
          </View>
        </View>
        <Text style={styles.milestoneDescription}>{milestone.description}</Text>
        {milestone.estimatedDate && (
          <Text style={styles.estimatedDate}>Estimasi: {milestone.estimatedDate}</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Milestones</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Rencana Pengembangan</Text>
        <Text style={styles.pageSubtitle}>
          Berikut adalah roadmap pengembangan sistem kami. Kami terus berupaya meningkatkan 
          pengalaman Anda dalam menggunakan aplikasi ini.
        </Text>
        
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Status:</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#2ecc71' }]} />
              <Text style={styles.legendText}>Selesai</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#f39c12' }]} />
              <Text style={styles.legendText}>Sedang Dikerjakan</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#3498db' }]} />
              <Text style={styles.legendText}>Direncanakan</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.milestonesContainer}>
          {milestones.map(renderMilestone)}
        </View>
        
        <View style={styles.encouragementContainer}>
          <Text style={styles.encouragementText}>
            Terima kasih telah menjadi bagian dari komunitas kami! Setiap masukan Anda 
            sangat berarti untuk membuat aplikasi ini lebih baik.
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  legendContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  milestonesContainer: {
    marginBottom: 20,
  },
  milestoneCard: {
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
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  milestoneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  milestoneDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  estimatedDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  encouragementContainer: {
    backgroundColor: '#e8f4fc',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#d1e7f9',
  },
  encouragementText: {
    fontSize: 14,
    color: '#3498db',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MilestonesScreen;