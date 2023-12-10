package com.stackroute.bookedappointments.controller;

import com.stackroute.bookedappointments.dto.AppointmentsResponseDTO;
import com.stackroute.bookedappointments.dto.AppointmentsRequestDTO;
import com.stackroute.bookedappointments.service.AppointmentsService;
import com.stackroute.bookedappointments.utility.AppointmentRequestUtility;
import com.stackroute.bookedappointments.utility.AppointmentResponseUtility;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/appointment")
@CrossOrigin("*")
public class AppointmentsController {

    private final AppointmentsService service;
    private final AppointmentRequestUtility appointmentRequestUtility;
    private final AppointmentResponseUtility appointmentResponseUtility;

    @GetMapping
    public ResponseEntity<List<AppointmentsResponseDTO>> showAllAppointments(){
        var appointments=service.findAll();
        var appointmentsDto=appointments.stream()
                .map(appointmentResponseUtility::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(appointmentsDto);
    }
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentsResponseDTO>> getAppointmentsByPatientId(@PathVariable String patientId){
        var appointments=service.findByPatientId(patientId);
        var appointmentsDto=appointments.stream()
                .map(appointmentResponseUtility::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(appointmentsDto);
    }
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentsResponseDTO> getAppointmentsById(@PathVariable int id){
        var appointment=service.findById(id);
        var appointmentDto=appointmentResponseUtility.toDto(appointment);
        return ResponseEntity.ok(appointmentDto);
    }
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<List<AppointmentsResponseDTO>> getAppointmentsByHospitalId(@PathVariable Long hospitalId){
        var appointments=service.findByHospitalId(hospitalId);
        var appointmentsDto=appointments.stream()
                .map(appointmentResponseUtility::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(appointmentsDto);
    }

    @PostMapping
    public ResponseEntity<AppointmentsRequestDTO> addAppointment(@Valid @RequestBody AppointmentsRequestDTO dto){
        var newAppointment = appointmentRequestUtility.toEntity(dto);
        var savedAppointment = service.initializeAppointment(newAppointment);
        var savedAppointmentDto = appointmentRequestUtility.toDto(savedAppointment);
        return ResponseEntity.status(201).body(savedAppointmentDto);
    }

    @DeleteMapping("/cancel/{appointmentId}")
    public ResponseEntity<AppointmentsRequestDTO> cancelAppointment(@PathVariable int appointmentId){
        var appointment=service.deleteAppointment(appointmentId);
        var appointmentDto=appointmentRequestUtility.toDto(appointment);
        return ResponseEntity.ok(appointmentDto);
    }
    @PutMapping("/confirm/{appointmentId}")
    public ResponseEntity<AppointmentsRequestDTO> confirmAppointment(@PathVariable int appointmentId){
        var appointment=service.confirmAppointment(appointmentId);
        var appointmentDto=appointmentRequestUtility.toDto(appointment);
        return ResponseEntity.ok(appointmentDto);
    }

    @PutMapping("/reschedule/{appointmentId}")
    public ResponseEntity<AppointmentsRequestDTO> updateAppointment(@Valid @PathVariable int appointmentId,@RequestBody AppointmentsRequestDTO dto){
        var appointment=appointmentRequestUtility.toEntity(dto);
        appointment.setAppointmentId(appointmentId);
        var updatedAppointment=service.rescheduleAppointment(appointmentId,appointment);
        var updatedAppointmentDto=appointmentRequestUtility.toDto(updatedAppointment);
        return ResponseEntity.ok(updatedAppointmentDto);
    }


}
