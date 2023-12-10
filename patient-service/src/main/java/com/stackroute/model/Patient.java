package com.stackroute.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "patient_details")
public class Patient {
    @MongoId
    private String patientId;

    private String patientName;
    private String email;
    private String phoneNumber;
    private LocalDate dob;
    private String bloodGroup;
    private String gender;
    private String cityName;
    private String district;
    private String state;
    private String country;
    private String zip;
    private String medicalHistory;
    private String medicineHistory;
    private String treatmentHistory;

    private String fileName;
    private String fileType;
    private byte[] imageData;
}
