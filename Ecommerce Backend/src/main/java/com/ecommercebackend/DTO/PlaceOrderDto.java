package com.ecommercebackend.DTO;


import java.util.List;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceOrderDto {

    private AddressDto address;
    private List<CartItemDto> items;
    private String paymentType;

}