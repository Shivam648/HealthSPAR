package com.stackroute.bookedappointments.repository;

import com.stackroute.bookedappointments.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentsRepository extends JpaRepository<Appointment,Integer> {
    List<Appointment> findByPatientId(String patientId);
    List<Appointment> findByHospitalId(Long hospitalId);
}
