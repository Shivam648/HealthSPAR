package com.stackroute.service;

import com.stackroute.exception.HospitalNotFoundException;
import com.stackroute.model.Doctor;
import com.stackroute.model.Hospital;
import com.stackroute.repository.DoctorRepository;
import com.stackroute.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class HospitalServiceImpl implements HospitalService {
    private final HospitalRepository hospitalRepository;
    private final DoctorRepository doctorRepository;
    @Override
    public Hospital createHospital(Hospital hospital) {
        log.info("Creating an hospital :"+hospital+" in the database");
        return hospitalRepository.save(hospital);
    }

    @Override
    public Hospital getHospitalById(Long id) {
        log.info("Fetching an hospital with id :"+id+" in the database");
        return hospitalRepository.findById(id).orElseThrow(
                ()->new HospitalNotFoundException("Hospital not found with id : "+id)
        );
    }

    @Override
    public Hospital getHospitalByEmail(String email) {
        return hospitalRepository.findByHospitalEmail(email);
    }

    @Override
    public List<Hospital> getAllHospitals() {
        log.info("Fetching all hospitals in the database");
        return hospitalRepository.findAll();
    }

    @Override
    public boolean deleteHospital(Long id) {
        log.info("Deleting an hospital with id :"+id+" in the database");
        if (hospitalRepository.existsById(id))
        {
            hospitalRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Hospital updateHospital(Long id, Hospital hospital) {
        log.info("Updating an hospital with id :"+id+" in the database");
        Hospital existingHospital=getHospitalById(id);
        existingHospital.setHospitalName(hospital.getHospitalName());
        existingHospital.setHospitalWebsite(hospital.getHospitalWebsite());
        existingHospital.setHospitalEmail(hospital.getHospitalEmail());
        existingHospital.setHospitalPhoneNumber(hospital.getHospitalPhoneNumber());
        existingHospital.setHospitalRating(hospital.getHospitalRating());
        existingHospital.setHospitalReviews(hospital.getHospitalReviews());
        existingHospital.setCity(hospital.getCity());
        existingHospital.setHospitalAmenities(hospital.getHospitalAmenities());
        existingHospital.setNumberOfBeds(hospital.getNumberOfBeds());
        existingHospital.setDoctors(hospital.getDoctors());
        existingHospital.setFrequentlyAskedQuestion(hospital.getFrequentlyAskedQuestion());
        return hospitalRepository.save(existingHospital);
    }


}
