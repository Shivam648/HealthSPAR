package com.stackroute.util;

import com.stackroute.dto.DoctorRequestDto;
import com.stackroute.model.Doctor;
import org.springframework.stereotype.Component;

@Component
public class DoctorRequestUtility {
    public DoctorRequestDto toDto(Doctor doctor)
    {
        return new DoctorRequestDto(
                doctor.getDoctorName(),
                doctor.getDepartment(),
                doctor.getQualification(),
                doctor.getLanguagesSpoken(),
                doctor.getYearOfExperience(),
                doctor.getStartTime(),
                doctor.getEndTime(),
                doctor.getBio()
        );
    }

    public Doctor toEntity(DoctorRequestDto dto){
        return Doctor
                .builder()
                .doctorName(dto.doctorName())
                .department(dto.department())
                .qualification(dto.qualification())
                .languagesSpoken(dto.languagesSpoken())
                .yearOfExperience(dto.yearOfExperience())
                .startTime(dto.startTime())
                .endTime(dto.endTime())
                .bio(dto.bio())
                .build();
    }
}
