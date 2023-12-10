package com.stackroute.util;

import com.stackroute.dto.HospitalRequestDto;
import com.stackroute.model.Hospital;
import org.springframework.stereotype.Component;

@Component
public class HospitalRequestUtility {
    public HospitalRequestDto toDto(Hospital hospital)
    {
        return new HospitalRequestDto(
                hospital.getHospitalName(),
                hospital.getHospitalWebsite(),
                hospital.getHospitalEmail(),
                hospital.getHospitalPhoneNumber(),
                hospital.getHospitalAmenities(),
                hospital.getNumberOfBeds(),
                hospital.getCity(),
                hospital.getDoctors(),
                hospital.getFrequentlyAskedQuestion()
        );
    }

    public Hospital toEntity(HospitalRequestDto dto){
        return Hospital
                .builder()
                .hospitalName(dto.hospitalName())
                .hospitalWebsite(dto.hospitalWebsite())
                .hospitalEmail(dto.hospitalEmail())
                .hospitalPhoneNumber(dto.hospitalPhoneNumber())
                .hospitalAmenities(dto.hospitalAmenities())
                .numberOfBeds(dto.numberOfBeds())
                .city(dto.city())
                .doctors(dto.doctors())
                .frequentlyAskedQuestion(dto.frequentlyAskedQuestion())
                .build();
    }
}
