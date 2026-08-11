import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Upload file to Firebase Storage with progress tracking
 * @param {File} file - File object to upload
 * @param {string} path - Storage folder path (e.g. 'volunteers/aadhaar')
 * @param {function} onProgress - Callback for progress percentage (0-100)
 * @returns {Promise<string>} Download URL of uploaded file
 */
export const uploadFileWithProgress = (file, path, onProgress) => {
  return new Promise((resolve, reject) => {
    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const storageRef = ref(storage, `${path}/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(Math.round(progress));
      },
      (error) => {
        console.error('Firebase Storage upload error:', error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

/**
 * Specialized Document Upload Shortcuts
 */
export const uploadProfilePhoto = (file, userId, onProgress) => {
  return uploadFileWithProgress(file, `profiles/${userId}`, onProgress);
};

export const uploadVolunteerAadhaar = (file, userId, onProgress) => {
  return uploadFileWithProgress(file, `documents/volunteers/${userId}/aadhaar`, onProgress);
};

export const uploadFaceVerification = (file, userId, onProgress) => {
  return uploadFileWithProgress(file, `verification/face/${userId}`, onProgress);
};

export const uploadNGOCertificate = (file, userId, onProgress) => {
  return uploadFileWithProgress(file, `documents/ngos/${userId}/certificates`, onProgress);
};

export const uploadGovtApproval = (file, userId, onProgress) => {
  return uploadFileWithProgress(file, `documents/approvals/${userId}`, onProgress);
};

export const uploadMedicalDocument = (file, userId, onProgress) => {
  return uploadFileWithProgress(file, `documents/seniors/${userId}/medical`, onProgress);
};

/**
 * Delete File from Firebase Storage
 */
export const deleteStorageFile = async (fileUrl) => {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Delete storage file error:', error);
  }
};
