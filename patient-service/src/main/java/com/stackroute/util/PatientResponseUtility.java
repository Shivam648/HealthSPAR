package com.stackroute.util;

import com.stackroute.dto.PatientResponseDto;
import com.stackroute.model.Patient;
import org.springframework.stereotype.Component;

@Component
public class PatientResponseUtility {
    public PatientResponseDto toDto(Patient patient)
    {
        return new PatientResponseDto(
                patient.getPatientId(),
                patient.getPatientName(),
                patient.getEmail(),
                patient.getPhoneNumber(),
                patient.getDob(),
                patient.getBloodGroup(),
                patient.getGender(),
                patient.getCityName(),
                patient.getDistrict(),
                patient.getState(),
                patient.getCountry(),
                patient.getZip(),
                patient.getMedicalHistory(),
                patient.getMedicineHistory(),
                patient.getTreatmentHistory(),
                patient.getFileName(),
                patient.getFileType(),
                patient.getImageData()
        );
    }

    public Patient toEntity(PatientResponseDto dto){
        return Patient
                .builder()
                .patientId(dto.patientId())
                .patientName(dto.patientName())
                .email(dto.email())
                .phoneNumber(dto.phoneNumber())
                .dob(dto.dob())
                .bloodGroup(dto.bloodGroup())
                .gender(dto.gender())
                .cityName(dto.cityName())
                .district(dto.district())
                .state(dto.state())
                .country(dto.country())
                .zip(dto.zip())
                .medicalHistory(dto.medicalHistory())
                .medicineHistory(dto.medicineHistory())
                .treatmentHistory(dto.treatmentHistory())
                .fileName(dto.fileName())
                .fileType(dto.fileType())
                .imageData(dto.imageData())
                .build();
    }
}
