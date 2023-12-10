package com.stackroute.util;

import com.stackroute.dto.PatientRequestDto;
import com.stackroute.model.Patient;
import org.springframework.stereotype.Component;

@Component
public class PatientRequestUtility {
    public PatientRequestDto toDto(Patient patient)
    {
        return new PatientRequestDto(
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
                patient.getTreatmentHistory()
        );
    }

    public Patient toEntity(PatientRequestDto dto){
        return Patient
                .builder()
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
                .build();
    }
}
