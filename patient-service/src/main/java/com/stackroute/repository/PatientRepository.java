package com.stackroute.repository;

import com.stackroute.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PatientRepository extends MongoRepository<Patient,String> {
    Optional<Patient> findByFileName(String fileName);
    Patient findByEmail(String email);
}
