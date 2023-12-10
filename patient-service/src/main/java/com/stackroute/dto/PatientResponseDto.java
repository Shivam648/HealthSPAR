package com.stackroute.dto;




import java.time.LocalDate;

public record PatientResponseDto(
        String patientId,
        String patientName,
        String email,
        String phoneNumber,
        LocalDate dob,
        String bloodGroup,
        String gender,
        String cityName,
        String district,
        String state,
        String country,
        String zip,
        String medicalHistory,
        String medicineHistory,
        String treatmentHistory,
        String fileName,
        String fileType,
        byte[] imageData
) {
}
