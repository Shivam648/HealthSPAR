package com.stackroute.dto;

import java.time.LocalTime;

public record DoctorDto(
        Long doctorId,
        String doctorName,
        String department,
        String qualification,
        String languagesSpoken,
        int yearOfExperience,
        LocalTime startTime,
        LocalTime endTime,
        String bio,
        String fileName,
        String fileType,
        byte[] imageData

) {
}
