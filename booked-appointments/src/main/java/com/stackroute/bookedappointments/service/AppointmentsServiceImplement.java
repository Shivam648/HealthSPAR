package com.stackroute.bookedappointments.service;

import com.stackroute.bookedappointments.exception.AppointmentsNotFoundException;
import com.stackroute.bookedappointments.model.Appointment;
import com.stackroute.bookedappointments.repository.AppointmentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentsServiceImplement implements AppointmentsService{
    private final AppointmentsRepository repository;
    @Override
    public Appointment findById(int appointmentId) {
        return repository.findById(appointmentId).orElseThrow(
                ()->new AppointmentsNotFoundException("Hospital not found with id : "+appointmentId)
        );
    }

    @Override
    public Appointment initializeAppointment(Appointment appointment) {
        appointment.setStatus("INITIALIZED");
        return repository.save(appointment);
    }

    @Override
    public Appointment rescheduleAppointment(int appointmentId, Appointment appointment) {
        Appointment existingAppointment=findById(appointmentId);
        existingAppointment.setStatus("RESCHEDULE");
        existingAppointment.setPatientId(appointment.getPatientId());
        existingAppointment.setHospitalId(appointment.getHospitalId());
        existingAppointment.setTreatmentType(appointment.getTreatmentType());
        existingAppointment.setDateTime(appointment.getDateTime());
        existingAppointment.setMessage(appointment.getMessage());
        existingAppointment.setDepartment(appointment.getDepartment());
        existingAppointment.setDoctor(appointment.getDoctor());
        existingAppointment.setPatientName(appointment.getPatientName());
        existingAppointment.setEmail(appointment.getEmail());
        existingAppointment.setPhoneNumber(appointment.getPhoneNumber());
        return repository.save(existingAppointment);
    }

    @Override
    public Appointment deleteAppointment(int appointmentId) {
        Appointment existingAppointment=findById(appointmentId);
        existingAppointment.setStatus("CANCEL");
        return repository.save(existingAppointment);
    }

    @Override
    public Appointment confirmAppointment(int appointmentId) {
        Appointment existingAppointment=findById(appointmentId);
        existingAppointment.setStatus("BOOKED");
        return repository.save(existingAppointment);
    }


    @Override
    public List<Appointment> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Appointment> findByPatientId(String patientId) {
        return repository.findByPatientId(patientId);
    }

    @Override
    public List<Appointment> findByHospitalId(Long hospitalId) {
        return repository.findByHospitalId(hospitalId);
    }


}
