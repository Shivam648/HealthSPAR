package com.stackroute.dto;



public record CityDto(
        Long cityId,
        String name,
        String district,
        String state,
        String country,
        String zip

) {
}
