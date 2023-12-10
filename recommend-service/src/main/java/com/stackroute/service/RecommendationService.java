package com.stackroute.service;

import com.stackroute.model.Hospital;
import com.stackroute.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {
    private final HospitalRepository hospitalRepository;

    public List<Hospital> recommendHospitalsForPatient(String cityName)
    {
        List<Hospital> allHospitals = hospitalRepository.findAll();

        return allHospitals.stream()
                .filter(hospital -> hospital.getCity().getName().equalsIgnoreCase(cityName))
                .collect(Collectors.toList());
    }




}
