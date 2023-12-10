export interface Appointment {
    appointmentId: number;
    patientId: string;
    hospitalId: number;
    treatmentType: string;
    dateTime: Date;
    message: string;
    status: string;
    department: string;
    doctor: string;
    patientName: string;
    email: string;
    phoneNumber: string;
}