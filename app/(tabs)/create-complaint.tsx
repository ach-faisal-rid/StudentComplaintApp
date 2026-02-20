import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, ActionSheetIOS, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { createComplaint, getCategories, Category } from '../../services/complaintService';

const CreateComplaintScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [imageAsset, setImageAsset] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const cats = await getCategories();
      setCategories(cats);
    } catch (error: any) {
      console.error('Error loading categories:', error);
      Alert.alert('Error', 'Failed to load categories. Please try again.');
    } finally {
      setLoadingCategories(false);
    }
  };

  const selectImageSource = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Take Photo', 'Choose from Library', 'Cancel'],
          cancelButtonIndex: 2,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            takePhoto();
          } else if (buttonIndex === 1) {
            pickImage();
          }
        }
      );
    } else {
      Alert.alert(
        'Select Image',
        'Choose an option',
        [
          { text: 'Take Photo', onPress: takePhoto },
          { text: 'Choose from Library', onPress: pickImage },
          { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
  };

  const takePhoto = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry', 'We need camera permissions to make this work!');
      return;
    }

    // Launch camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setImageAsset(result.assets[0]);
    }
  };

  const pickImage = async () => {
    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry', 'We need camera roll permissions to make this work!');
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setImageAsset(result.assets[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageAsset(null);
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!categoryId) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    setLoading(true);
    try {
      // Add image if selected
      if (imageAsset) {
        // Convert URI to Blob for upload
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category_id', categoryId.toString());
        formData.append('priority', priority);
        
        // Append image file
        const fileName = imageAsset.uri.split('/').pop() || 'image.jpg';
        const fileType = fileName.split('.').pop() || 'jpg';
        
        formData.append('image', {
          uri: imageAsset.uri,
          name: fileName,
          type: `image/${fileType}`,
        } as any);
        
        await createComplaint(formData as any);
      } else {
        await createComplaint({ 
          title, 
          description, 
          category_id: categoryId,
          priority 
        });
      }
      
      Alert.alert('Success', 'Complaint submitted successfully', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      // Show more detailed error message
      const errorMessage = error.message || 'Failed to submit complaint. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Submit New Complaint</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter complaint title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Category *</Text>
        {loadingCategories ? (
          <Text style={styles.loadingText}>Loading categories...</Text>
        ) : (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={categoryId}
              onValueChange={(itemValue) => setCategoryId(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a category" value={null} />
              {categories.map((category) => (
                <Picker.Item 
                  key={category.id} 
                  label={category.name} 
                  value={category.id} 
                />
              ))}
            </Picker>
          </View>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Priority</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue) => setPriority(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Rendah" value="low" />
            <Picker.Item label="Sedang" value="medium" />
            <Picker.Item label="Tinggi" value="high" />
            <Picker.Item label="Mendesak" value="urgent" />
          </Picker>
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your complaint in detail"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Attach Image (Optional)</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={selectImageSource}>
          {image ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
                <Text style={styles.removeImageText}>×</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imagePickerContent}>
              <Text style={styles.imagePickerText}>Tap to add photo</Text>
              <Text style={styles.imagePickerSubtext}>Choose from library or take a new photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Instructions for using the image feature */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>How to add an image:</Text>
        <Text style={styles.instructionText}>1. Tap on the image area above</Text>
        <Text style={styles.instructionText}>2. Choose "Take Photo" to use the camera or "Choose from Library" to select an existing image</Text>
        <Text style={styles.instructionText}>3. After capturing/selecting an image, you can remove it by tapping the × button in the top-right corner</Text>
        <Text style={styles.instructionText}>4. Submit the complaint as usual</Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginVertical: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120,
    paddingTop: 15,
    textAlignVertical: 'top',
  },
  imagePicker: {
    height: 200,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imagePickerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePickerSubtext: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  imagePreviewContainer: {
    width: '100%',
    height: '100%',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    backgroundColor: '#e8f4ff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default CreateComplaintScreen;