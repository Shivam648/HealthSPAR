package com.stackroute.model;

import lombok.*;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import javax.persistence.Column;
import javax.persistence.Lob;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Node
public class Hospital {
    @Id
    @GeneratedValue
    private Long hospitalId;
    private String hospitalName;
    private String hospitalWebsite;
    private String hospitalEmail;
    private String hospitalPhoneNumber;
    private Double hospitalRating;
    private List<String> hospitalReviews;
    private String hospitalAmenities; //parking/cafeteria
    private int numberOfBeds;

    @Relationship(type = "LOCATED_IN",direction=Relationship.Direction.OUTGOING)
    private City city;

    @Relationship(type = "HAS_DOCTOR",direction = Relationship.Direction.OUTGOING)
    private List<Doctor> doctors;

    private List<AskedQuestion> frequentlyAskedQuestion;



    private String fileName;
    private String fileType;

    @Column(name = "imageData",unique = false, nullable = false, length = 100000)
    private byte[] imageData;

}
