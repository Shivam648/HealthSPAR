package com.stackroute.repository;

import com.stackroute.model.Doctor;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;

public interface DoctorRepository extends Neo4jRepository<Doctor,Long> {
    Optional<Doctor> findByFileName(String fileName);
}
