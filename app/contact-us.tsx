import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MilestonesLink from '../components/MilestonesLink';

const ContactUsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contact Us</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Get in Touch</Text>
        
        <View style={styles.introSection}>
          <Text style={styles.introText}>
            If you have any questions, concerns, or need assistance with the student complaint system, please don't hesitate to reach out to us through the following channels:
          </Text>
        </View>
        
        {/* Office Hours */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="access-time" size={20} color="#fff" />
            <Text style={styles.sectionTitle}>Office Hours</Text>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="schedule" size={20} color="#007AFF" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Monday - Friday</Text>
              <Text style={styles.contactValue}>08:00 AM - 04:00 PM</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="schedule" size={20} color="#007AFF" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Saturday</Text>
              <Text style={styles.contactValue}>09:00 AM - 12:00 PM</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="schedule" size={20} color="#007AFF" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Sunday</Text>
              <Text style={styles.contactValue}>Closed</Text>
            </View>
          </View>
        </View>
        
        {/* Contact Methods */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="contact-phone" size={20} color="#fff" />
            <Text style={styles.sectionTitle}>Contact Methods</Text>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="email" size={20} color="#007AFF" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@studentcomplaint.edu</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="phone" size={20} color="#007AFF" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>(+62) 21 1234 5678</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="location-on" size={20} color="#007AFF" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactValue}>Student Services Building, Room 101</Text>
              <Text style={styles.contactValue}>123 Education Street, University District</Text>
            </View>
          </View>
        </View>
        
        {/* Emergency Contact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="warning" size={20} color="#fff" />
            <Text style={styles.sectionTitle}>Emergency Contact</Text>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="priority-high" size={20} color="#FF3B30" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Urgent Matters</Text>
              <Text style={styles.contactValue}>emergency@studentcomplaint.edu</Text>
              <Text style={styles.contactValue}>(+62) 21 8765 4321</Text>
            </View>
          </View>
        </View>
        
        {/* Social Media */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="share" size={20} color="#fff" />
            <Text style={styles.sectionTitle}>Social Media</Text>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="facebook" size={20} color="#007AFF" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Facebook</Text>
              <Text style={styles.contactValue}>@StudentComplaintSystem</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="chat" size={20} color="#007AFF" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Twitter/X</Text>
              <Text style={styles.contactValue}>@StudentComplaintSys</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="photo" size={20} color="#007AFF" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Instagram</Text>
              <Text style={styles.contactValue}>@studentcomplaintsystem</Text>
            </View>
          </View>
        </View>
        
        {/* Milestones Link */}
        <MilestonesLink />
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
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  introSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  introText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  contactItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'flex-start',
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  contactValue: {
    fontSize: 15,
    color: '#666',
    lineHeight: 20,
  },
});

export default ContactUsScreen;