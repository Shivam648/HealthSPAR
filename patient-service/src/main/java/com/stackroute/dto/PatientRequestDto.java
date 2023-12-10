package com.stackroute.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;

public record PatientRequestDto(
        @NotBlank(message = "Patient must have a name")
        String patientName,
        @Email(message = "Patient must have a email")
        String email,
        @NotBlank(message = "Patient must have a phone number")
        String phoneNumber,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate dob,
        @NotBlank(message = "Patient must have a phone number")
        String bloodGroup,
        @NotBlank(message = "Patient must have a phone number")
        String gender,
        @NotBlank(message = "City must have a name")
        String cityName,
        @NotBlank(message = "City must have a district name")
        String district,
        @NotBlank(message = "City must have a state name")
        String state,
        @NotBlank(message = "City must have a country name")
        String country,
        @NotBlank(message = "City must have a zip code")
        @Pattern(regexp = "\\d{6}", message = "Zip code must have exactly 6 digits")
        String zip,
        String medicalHistory,
        String medicineHistory,
        String treatmentHistory
) {

}
