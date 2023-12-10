package com.stackroute.bookedappointments.service;

import com.stackroute.bookedappointments.model.Appointment;

import java.util.List;

public interface AppointmentsService {
    public Appointment findById(int appointmentId);
    public Appointment initializeAppointment(Appointment appointment);
    public Appointment rescheduleAppointment(int appointmentId, Appointment appointment);
    public Appointment deleteAppointment(int appointmentId);
    public Appointment confirmAppointment(int appointmentId);

    public List<Appointment> findAll();
    public List<Appointment> findByPatientId(String patientId);
    public List<Appointment> findByHospitalId(Long hospitalId);

}
