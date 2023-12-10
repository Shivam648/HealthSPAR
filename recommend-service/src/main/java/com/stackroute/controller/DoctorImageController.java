package com.stackroute.controller;

import com.stackroute.dto.ImageUploadResponse;
import com.stackroute.model.Doctor;
import com.stackroute.model.Hospital;
import com.stackroute.model.Image;
import com.stackroute.repository.DoctorRepository;
import com.stackroute.repository.HospitalRepository;
import com.stackroute.service.HospitalService;
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
@RequestMapping("/api/v1/hospital")
@CrossOrigin("*")
public class DoctorImageController {
    private final HospitalRepository hospitalRepository;
    private final DoctorRepository doctorRepository;
    private final HospitalService hospitalService;


    @PostMapping("/upload/image/{hospitalId}/{index}")
    public ResponseEntity<ImageUploadResponse> uploadDoctorImage(@RequestParam("image") MultipartFile file, @PathVariable Long hospitalId, @PathVariable int index)
            throws IOException {
        Hospital hospital=hospitalService.getHospitalById(hospitalId);

        if (hospital == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ImageUploadResponse("Hospital not found with ID: " + hospitalId));
        }

        if (index<0 || index>=hospital.getDoctors().size()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ImageUploadResponse("Invalid doctor index : "+index));
        }

        Doctor doctorToUpdate=hospital.getDoctors().get(index);
        doctorToUpdate.setFileName(file.getOriginalFilename());
        doctorToUpdate.setFileType(file.getContentType());
        doctorToUpdate.setImageData(ImageUtility.compressImage(file.getBytes()));

        hospitalRepository.save(hospital);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageUploadResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    @GetMapping(path = {"/get/doctor/image/info/{name}"})
    public Image getDoctorImageDetails(@PathVariable("name") String name) throws IOException {

        final Optional<Doctor> dbImage = doctorRepository.findByFileName(name);

        return Image.builder()
                .fileName(dbImage.get().getFileName())
                .fileType(dbImage.get().getFileType())
                .imageData(ImageUtility.decompressImage(dbImage.get().getImageData())).build();
    }

    @GetMapping(path = {"/get/doctor/image/{name}"})
    public ResponseEntity<byte[]> getDoctorImage(@PathVariable("name") String name) throws IOException {

        final Optional<Doctor> dbImage = doctorRepository.findByFileName(name);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getFileType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImageData()));
    }

}
