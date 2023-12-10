package com.stackroute.controller;

import com.stackroute.dto.ImageUploadResponse;
import com.stackroute.model.Hospital;
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
public class HospitalImageController {
    private final HospitalRepository hospitalRepository;
    private final HospitalService hospitalService;

    @PostMapping("/upload/image/{hospitalId}")
    public ResponseEntity<ImageUploadResponse> uplaodImage(@RequestParam("image") MultipartFile file,@PathVariable Long hospitalId)
            throws IOException {
        Hospital hospital=hospitalService.getHospitalById(hospitalId);

        if (hospital == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ImageUploadResponse("Hospital not found with ID: " + hospitalId));
        }

        hospital.setFileName(file.getOriginalFilename());
        hospital.setFileType(file.getContentType());
        hospital.setImageData(ImageUtility.compressImage(file.getBytes()));

        hospitalRepository.save(hospital);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageUploadResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    @GetMapping(path = {"/get/image/info/{name}"})
    public Hospital getImageDetails(@PathVariable("name") String name) throws IOException {

        final Optional<Hospital> dbImage = hospitalRepository.findByFileName(name);

        return Hospital.builder()
                .fileName(dbImage.get().getFileName())
                .fileType(dbImage.get().getFileType())
                .imageData(ImageUtility.decompressImage(dbImage.get().getImageData())).build();
    }

    @GetMapping(path = {"/get/image/{name}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {

        final Optional<Hospital> dbImage = hospitalRepository.findByFileName(name);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getFileType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImageData()));
    }

}
