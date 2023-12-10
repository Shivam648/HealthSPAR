package com.stackroute.controller;

import com.stackroute.dto.*;
import com.stackroute.model.Doctor;
import com.stackroute.model.Hospital;
import com.stackroute.service.HospitalService;
import com.stackroute.util.DoctorRequestUtility;
import com.stackroute.util.DoctorResponseUtility;
import com.stackroute.util.HospitalRequestUtility;
import com.stackroute.util.HospitalResponseUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hospital")
@CrossOrigin("*")
public class HospitalController {
    private final HospitalService hospitalService;
    private final HospitalRequestUtility hospitalRequestUtility;
    private final HospitalResponseUtility hospitalResponseUtility;
    private final DoctorResponseUtility doctorResponseUtility;
    private final DoctorRequestUtility doctorRequestUtility;

    @PostMapping
    public ResponseEntity<HospitalRequestDto> createHospital(@RequestBody HospitalRequestDto dto)
    {
        var hospital=hospitalRequestUtility.toEntity(dto);
        var savedHospital=hospitalService.createHospital(hospital);
        var savedHospitalDto=hospitalRequestUtility.toDto(savedHospital);
        return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(savedHospitalDto);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<HospitalResponseDto> getHospitalById(@PathVariable Long id)
    {
        var hospital=hospitalService.getHospitalById(id);
        var hospitalDto=hospitalResponseUtility.toDto(hospital);
        return ResponseEntity.ok(hospitalDto);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<HospitalResponseDto> getHospitalByEmail(@PathVariable String email)
    {
        var hospital=hospitalService.getHospitalByEmail(email);
        var hospitalDto=hospitalResponseUtility.toDto(hospital);
        return ResponseEntity.ok(hospitalDto);
    }

    @GetMapping("/{hospitalId}/doctors/{doctorIndex}")
    public ResponseEntity<DoctorResponseDto> getDoctorByHospitalIdAndIndex(
            @PathVariable Long hospitalId,
            @PathVariable int doctorIndex
    ){
        Hospital hospital=hospitalService.getHospitalById(hospitalId);
        if (hospital!=null && doctorIndex >=0 && doctorIndex<hospital.getDoctors().size()){
            Doctor doctor=hospital.getDoctors().get(doctorIndex);
            var doctorDto=doctorResponseUtility.toDto(doctor);
            return ResponseEntity.ok(doctorDto);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    //delete doctor by hospital id and index
    @DeleteMapping("/{hospitalId}/doctors/{doctorIndex}")
    public ResponseEntity<Void> deleteDoctor(
            @PathVariable Long hospitalId,
            @PathVariable int doctorIndex
    ){
        Hospital hospital=hospitalService.getHospitalById(hospitalId);
        if (hospital!=null && doctorIndex >=0 && doctorIndex<hospital.getDoctors().size()){
            hospital.getDoctors().remove(doctorIndex);
            hospitalService.updateHospital(hospitalId,hospital);
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/{hospitalId}/doctors/{doctorIndex}")
    public ResponseEntity<DoctorRequestDto> updateDoctorByHospitalIdAndIndex(
            @PathVariable Long hospitalId,
            @PathVariable int doctorIndex,
            @RequestBody DoctorRequestDto dto
    ) {
        Hospital hospital=hospitalService.getHospitalById(hospitalId);

        if(hospital!=null && doctorIndex >=0 && doctorIndex<hospital.getDoctors().size()){
            Doctor existingDoctor=hospital.getDoctors().get(doctorIndex);
            existingDoctor.setDoctorName(dto.doctorName());
            existingDoctor.setDepartment(dto.department());
            existingDoctor.setQualification(dto.qualification());
            existingDoctor.setLanguagesSpoken(dto.languagesSpoken());
            existingDoctor.setStartTime(dto.startTime());
            existingDoctor.setEndTime(dto.endTime());
            existingDoctor.setBio(dto.bio());

            hospital.getDoctors().set(doctorIndex,existingDoctor);
            hospitalService.updateHospital(hospitalId,hospital);
            var updatedDoctorDto=doctorRequestUtility.toDto(existingDoctor);
            return ResponseEntity.ok(updatedDoctorDto);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{hospitalId}/doctors")
    public ResponseEntity<DoctorResponseDto> addDoctorToHospital(
            @PathVariable Long hospitalId,
            @RequestBody DoctorRequestDto dto
    ){
        Hospital hospital=hospitalService.getHospitalById(hospitalId);
        if (hospital!=null){
            Doctor newDoctor=Doctor.builder()
                    .doctorName(dto.doctorName())
                    .department(dto.department())
                    .qualification(dto.qualification())
                    .languagesSpoken(dto.languagesSpoken())
                    .startTime(dto.startTime())
                    .endTime(dto.endTime())
                    .bio(dto.bio())
                    .build();

            hospital.getDoctors().add(newDoctor);

            hospitalService.updateHospital(hospitalId,hospital);
            var addedDoctorDto=doctorResponseUtility.toDto(newDoctor);
            return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(addedDoctorDto);
        }else {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping
    public ResponseEntity<List<HospitalResponseDto>> getAllHospitals(){
        List<Hospital> hospitals=hospitalService.getAllHospitals();
        var hospitalsDto=hospitals
                .stream()
                .map((hospitalResponseUtility::toDto))
                .collect(Collectors.toList());
        return ResponseEntity.ok(hospitalsDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HospitalRequestDto> updateHospital( @PathVariable Long id,@RequestBody HospitalRequestDto dto){
        Hospital newHospital=hospitalRequestUtility.toEntity(dto);
        newHospital.setHospitalId(id);
        var updatedHospital=hospitalService.updateHospital(id,newHospital);
        var updatedHospitalDto=hospitalRequestUtility.toDto(updatedHospital);
        return ResponseEntity.ok(updatedHospitalDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHospital(@PathVariable Long id)
    {
        boolean deleted=hospitalService.deleteHospital(id);
        if (deleted){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
