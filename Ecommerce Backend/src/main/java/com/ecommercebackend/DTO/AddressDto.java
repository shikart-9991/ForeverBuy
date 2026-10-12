package com.ecommercebackend.DTO;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AddressDto {
    private String firstName;
    private String lastName;
    private String street;
    private String city;
    private String state;
    private String zipCode; // Matches JSON "zipCode"
    private String country;
    private String phoneNumber; // Matches JSON "phoneNumber"
}

