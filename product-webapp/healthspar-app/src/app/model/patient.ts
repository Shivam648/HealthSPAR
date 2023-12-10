export interface Patient {
  patientId: string;
  patientName: string;
  email: string;
  phoneNumber: string;
  dob: Date;
  bloodGroup: string;
  gender: string;
  cityName: string;
  district: string;
  state: string;
  country: string;
  zip: string;
  medicalHistory: string;
  medicineHistory: string;
  treatmentHistory: string;
  fileName?: string;
  fileType?: string;
  imageData?: Uint8Array;
}
