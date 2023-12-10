package com.stackroute.repository;

import com.stackroute.model.Doctor;
import com.stackroute.model.Hospital;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;


public interface HospitalRepository extends Neo4jRepository<Hospital,Long> {
    Optional<Hospital> findByFileName(String fileName);
    Hospital findByHospitalEmail(String hospitalEmail);

}
