package com.stackroute.bookedappointments.dto;

import java.time.LocalDateTime;

public record AppointmentsResponseDTO(
        int appointmentId,
        String patientId,
        Long hospitalId,
        String treatmentType,
        LocalDateTime dateTime,
        String message,
        String status,
        String department,
        String doctor,
        String patientName,
        String email,
        String phoneNumber
) {
}
