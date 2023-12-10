package com.stackroute.service;

import com.stackroute.model.Patient;

import java.util.List;

public interface PatientService {
    public Patient savePatient(Patient patient);
    public Patient updatePatient(String patientId,Patient patient);
    public boolean deletePatient(String patientId);
    public List<Patient> getAllPatients();
    public Patient getPatientById(String patientId);
    public Patient getPatientByEmail(String email);

}
