package com.stackroute.dto;

import java.time.LocalTime;

public record DoctorRequestDto(
        String doctorName,
        String department,
        String qualification,
        String languagesSpoken,
        int yearOfExperience,
        LocalTime startTime,
        LocalTime endTime,
        String bio
) {
}
