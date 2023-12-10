package com.stackroute.service;

import com.stackroute.model.Doctor;
import com.stackroute.model.Hospital;

import java.util.List;

public interface HospitalService {
    public Hospital createHospital(Hospital hospital);
    public Hospital getHospitalById(Long id);
    public Hospital getHospitalByEmail(String email);
    public List<Hospital> getAllHospitals();
    public boolean deleteHospital(Long id);
    public Hospital updateHospital(Long id,Hospital hospital);

}
