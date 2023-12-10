package com.stackroute.bookedappointments.utility;

import com.stackroute.bookedappointments.dto.AppointmentsResponseDTO;
import com.stackroute.bookedappointments.model.Appointment;
import org.springframework.stereotype.Component;

@Component
public class AppointmentResponseUtility {
    public Appointment toEntity(AppointmentsResponseDTO dto){
        return Appointment
                .builder()
                .appointmentId(dto.appointmentId())
                .patientId(dto.patientId())
                .hospitalId(dto.hospitalId())
                .treatmentType(dto.treatmentType())
                .dateTime(dto.dateTime())
                .message(dto.message())
                .status(dto.status())
                .department(dto.department())
                .doctor(dto.doctor())
                .patientName(dto.patientName())
                .email(dto.email())
                .phoneNumber(dto.phoneNumber())
                .build();
    }

    public AppointmentsResponseDTO toDto(Appointment appointment){
        return new AppointmentsResponseDTO(
                appointment.getAppointmentId(),
                appointment.getPatientId(),
                appointment.getHospitalId(),
                appointment.getTreatmentType(),
                appointment.getDateTime(),
                appointment.getMessage(),
                appointment.getStatus(),
                appointment.getDepartment(),
                appointment.getDoctor(),
                appointment.getPatientName(),
                appointment.getEmail(),
                appointment.getPhoneNumber()
        );
    }
}
