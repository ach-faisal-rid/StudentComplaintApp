import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MilestonesLink from '../../components/MilestonesLink';

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Help & SOP</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Standard Operating Procedure (SOP)</Text>
        
        <View style={styles.introSection}>
          <Text style={styles.introText}>
            This student complaint system is designed to provide a safe and structured platform for students to submit complaints, aspirations, or grievances.
          </Text>
        </View>
        
        {/* Student Guidelines */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="school" size={20} color="#fff" />
            <Text style={styles.sectionTitle}>Guidelines for Students</Text>
          </View>
          
          <View style={styles.guidelineItem}>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletNumber}>1</Text>
            </View>
            <Text style={styles.guidelineText}>
              <Text style={styles.boldText}>Honesty:</Text> Submit complaints honestly and factually. Avoid false accusations or defamation.
            </Text>
          </View>
          
          <View style={styles.guidelineItem}>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletNumber}>2</Text>
            </View>
            <Text style={styles.guidelineText}>
              <Text style={styles.boldText}>Complete Information:</Text> Provide complete and clear information in the complaint form, including date, time, location, and description of the incident.
            </Text>
          </View>
          
          <View style={styles.guidelineItem}>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletNumber}>3</Text>
            </View>
            <Text style={styles.guidelineText}>
              <Text style={styles.boldText}>Polite Language:</Text> Use polite and respectful language when submitting complaints. Avoid harsh or provocative words.
            </Text>
          </View>
          
          <View style={styles.guidelineItem}>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletNumber}>4</Text>
            </View>
            <Text style={styles.guidelineText}>
              <Text style={styles.boldText}>Supporting Evidence:</Text> If possible, attach supporting evidence such as photos or documents related to the complaint.
            </Text>
          </View>
          
          <View style={styles.guidelineItem}>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletNumber}>5</Text>
            </View>
            <Text style={styles.guidelineText}>
              <Text style={styles.boldText}>Respect Privacy:</Text> Respect others' privacy in your complaint. Do not share personal information of others without permission.
            </Text>
          </View>
          
          <View style={styles.guidelineItem}>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletNumber}>6</Text>
            </View>
            <Text style={styles.guidelineText}>
              <Text style={styles.boldText}>Monitor Status:</Text> Regularly monitor your complaint status through the system to track progress.
            </Text>
          </View>
        </View>
        
        {/* General Rules */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="rule" size={20} color="#fff" />
            <Text style={styles.sectionTitle}>General Rules</Text>
          </View>
          
          <View style={styles.guidelineItem}>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletDot}>•</Text>
            </View>
            <Text style={styles.guidelineText}>
              <Text style={styles.boldText}>Sanctions:</Text> Violations of this SOP may result in access restrictions or other sanctions according to school regulations.
            </Text>
          </View>
          
          <View style={styles.guidelineItem}>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletDot}>•</Text>
            </View>
            <Text style={styles.guidelineText}>
              <Text style={styles.boldText}>Confidentiality:</Text> All parties must maintain confidentiality of information obtained during the complaint handling process.
            </Text>
          </View>
          
          <View style={styles.guidelineItem}>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletDot}>•</Text>
            </View>
            <Text style={styles.guidelineText}>
              <Text style={styles.boldText}>Ethics:</Text> All parties must uphold ethics and integrity when using this system.
            </Text>
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
  guidelineItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bulletContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bulletNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bulletDot: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  guidelineText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default HelpScreen;