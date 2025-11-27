import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { removeAuthToken } from '../../services/storage';
import MilestonesLink from '../../components/MilestonesLink';

const ProfileScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await removeAuthToken();
            router.replace('/');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <Link href="/edit-profile" style={styles.optionItem}>
            <Text style={styles.optionText}>Edit Profile</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </Link>
          <Link href="/change-password" style={styles.optionItem}>
            <Text style={styles.optionText}>Change Password</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </Link>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Link href="/notification-settings" style={styles.optionItem}>
            <Text style={styles.optionText}>Notification Settings</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </Link>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <Link href="/help" style={styles.optionItem}>
            <Text style={styles.optionText}>Help & SOP</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </Link>
          <Link href="/contact-us" style={styles.optionItem}>
            <Text style={styles.optionText}>Contact Us</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </Link>
        </View>
        
        {/* Milestones Link */}
        <MilestonesLink />
        
        <View style={styles.section}>
          <TouchableOpacity 
            style={[styles.optionItem, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Logout</Text>
            <MaterialIcons name="logout" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15,
    paddingBottom: 10,
    color: '#666',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
});

export default ProfileScreen;