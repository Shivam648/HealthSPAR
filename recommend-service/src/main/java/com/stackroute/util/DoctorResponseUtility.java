package com.stackroute.util;

import com.stackroute.dto.DoctorResponseDto;
import com.stackroute.model.Doctor;
import org.springframework.stereotype.Component;

@Component
public class DoctorResponseUtility {

    public DoctorResponseDto toDto(Doctor doctor)
    {
        return new DoctorResponseDto(
                doctor.getDoctorId(),
                doctor.getDoctorName(),
                doctor.getDepartment(),
                doctor.getQualification(),
                doctor.getLanguagesSpoken(),
                doctor.getYearOfExperience(),
                doctor.getStartTime(),
                doctor.getEndTime(),
                doctor.getBio(),
                doctor.getFileName(),
                doctor.getFileType(),
                doctor.getImageData()
        );
    }

    public Doctor toEntity(DoctorResponseDto dto){
        return Doctor
                .builder()
                .doctorId(dto.doctorId())
                .doctorName(dto.doctorName())
                .department(dto.department())
                .qualification(dto.qualification())
                .languagesSpoken(dto.languagesSpoken())
                .yearOfExperience(dto.yearOfExperience())
                .startTime(dto.startTime())
                .endTime(dto.endTime())
                .bio(dto.bio())
                .fileName(dto.fileName())
                .fileType(dto.fileType())
                .imageData(dto.imageData())
                .build();
    }
}
