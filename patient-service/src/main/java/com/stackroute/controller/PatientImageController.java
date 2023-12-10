package com.stackroute.controller;

import com.stackroute.dto.ImageUploadResponse;
import com.stackroute.model.Patient;
import com.stackroute.repository.PatientRepository;
import com.stackroute.service.PatientService;
import com.stackroute.util.ImageUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/patient")
public class PatientImageController {
    private final PatientRepository patientRepository;
    private final PatientService patientService;

    @PostMapping("/upload/image/{patientId}")
    public ResponseEntity<ImageUploadResponse> uplaodImage(@RequestParam("image") MultipartFile file, @PathVariable String patientId)
            throws IOException {
        Patient patient=patientService.getPatientById(patientId);

        if (patient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ImageUploadResponse("Patient not found with ID: " + patientId));
        }

        patient.setFileName(file.getOriginalFilename());
        patient.setFileType(file.getContentType());
        patient.setImageData(ImageUtility.compressImage(file.getBytes()));

        patientRepository.save(patient);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageUploadResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    @GetMapping(path = {"/get/image/info/{name}"})
    public Patient getImageDetails(@PathVariable("name") String name) throws IOException {

        final Optional<Patient> dbImage = patientRepository.findByFileName(name);

        return Patient.builder()
                .fileName(dbImage.get().getFileName())
                .fileType(dbImage.get().getFileType())
                .imageData(ImageUtility.decompressImage(dbImage.get().getImageData())).build();
    }

    @GetMapping(path = {"/get/image/{name}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {

        final Optional<Patient> dbImage = patientRepository.findByFileName(name);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getFileType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImageData()));
    }

}

