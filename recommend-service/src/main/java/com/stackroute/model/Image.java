package com.stackroute.model;

import lombok.*;

import javax.persistence.Column;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Image {
    private String fileName;
    private String fileType;

    private byte[] imageData;
}
