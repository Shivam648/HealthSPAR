package com.stackroute.controller;

import com.stackroute.dto.PatientRequestDto;
import com.stackroute.dto.PatientResponseDto;
import com.stackroute.service.PatientService;
import com.stackroute.util.PatientRequestUtility;
import com.stackroute.util.PatientResponseUtility;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/patient")
@CrossOrigin("*")
public class PatientController {
    private final PatientService patientService;
    private final PatientRequestUtility requestUtility;
    private final PatientResponseUtility responseUtility;

    @PostMapping
    public ResponseEntity<PatientRequestDto> addPatient(@Valid @RequestBody PatientRequestDto dto)
    {
        var patient=requestUtility.toEntity(dto);
        var savedPatient=patientService.savePatient(patient);
        var savedPatientDto=requestUtility.toDto(savedPatient);
        return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(savedPatientDto);
    }

    @GetMapping("/id/{patientId}")
    public ResponseEntity<PatientResponseDto> getPatientById(@PathVariable String patientId)
    {
        var patient=patientService.getPatientById(patientId);
        var patientDto=responseUtility.toDto(patient);
        return ResponseEntity.ok(patientDto);
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<PatientResponseDto> getPatientByEmail(@PathVariable String email)
    {
        var patient=patientService.getPatientByEmail(email);
        var patientDto=responseUtility.toDto(patient);
        return ResponseEntity.ok(patientDto);
    }

    @GetMapping
    public ResponseEntity<List<PatientResponseDto>> getAllPatients()
    {
        var patients=patientService.getAllPatients();
        var patientsDto=patients.stream()
                .map(responseUtility::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(patientsDto);
    }

    @PutMapping("/{patientId}")
    public ResponseEntity<PatientRequestDto> updatePatient(@Valid @PathVariable String patientId,@RequestBody PatientRequestDto dto)
    {
        var patient=requestUtility.toEntity(dto);
        patient.setPatientId(patientId);
        var updatedPatient=patientService.updatePatient(patientId,patient);
        var updatedPatientDto=requestUtility.toDto(updatedPatient);
        return ResponseEntity.ok(updatedPatientDto);
    }

    @DeleteMapping("/{patientId}")
    public ResponseEntity<Void> deletePatient(@PathVariable String patientId)
    {
        boolean deleted= patientService.deletePatient(patientId);
        if (deleted){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
