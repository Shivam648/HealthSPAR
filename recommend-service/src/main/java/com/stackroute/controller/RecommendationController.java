package com.stackroute.controller;

import com.stackroute.model.Hospital;
import com.stackroute.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hospital")
@CrossOrigin("*")
public class RecommendationController {
    private final RecommendationService recommendationService;

    @GetMapping("/patient/{cityName}")
    public ResponseEntity<List<Hospital>> getRecommendedHospitals(@PathVariable String cityName)
    {
        List<Hospital> recommendedHospitals=recommendationService.recommendHospitalsForPatient(cityName);
        return ResponseEntity.ok(recommendedHospitals);
    }



}
