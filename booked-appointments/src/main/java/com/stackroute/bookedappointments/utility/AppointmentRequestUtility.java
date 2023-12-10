package com.stackroute.bookedappointments.utility;

import com.stackroute.bookedappointments.dto.AppointmentsRequestDTO;
import com.stackroute.bookedappointments.model.Appointment;
import org.springframework.stereotype.Component;

@Component
public class AppointmentRequestUtility {
    public Appointment toEntity(AppointmentsRequestDTO dto){
        return Appointment
                .builder()
                .patientId(dto.patientId())
                .hospitalId(dto.hospitalId())
                .treatmentType(dto.treatmentType())
                .dateTime(dto.dateTime())
                .message(dto.message())
                .department(dto.department())
                .doctor(dto.doctor())
                .patientName(dto.patientName())
                .email(dto.email())
                .phoneNumber(dto.phoneNumber())
                .build();
    }

    public AppointmentsRequestDTO toDto(Appointment appointment){
        return new AppointmentsRequestDTO(
                appointment.getPatientId(),
                appointment.getHospitalId(),
                appointment.getTreatmentType(),
                appointment.getDateTime(),
                appointment.getMessage(),
                appointment.getDepartment(),
                appointment.getDoctor(),
                appointment.getPatientName(),
                appointment.getEmail(),
                appointment.getPhoneNumber()
        );
    }
}
