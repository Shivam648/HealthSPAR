export interface Doctor {
  doctorName: string;
  department: string;
  qualification: string;
  languagesSpoken: string;
  yearOfExperience: number;
  startTime: Date; 
  endTime: Date; 
  bio: string;
  fileName?: string;
  fileType?: string;
  imageData?: Uint8Array;
}
