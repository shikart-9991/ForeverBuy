package com.ecommercebackend.DTO;



import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartItemDto {

    private Long id;              // productId
    private String name;          // productName
    private Double price;
    private Integer qty;
    private String size;

    private List<String> imageUrls;   // frontend sends array
}

