package com.ecommercebackend.DTO;

import lombok.*;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String dummyid;
    private String description;
    private Double price;
    private String category;
    private String subCategory;
    private String sizes;
    private List<String> imageUrls;
    private Boolean bestseller;
    private Long createdAt;

    public void getCreatedAt(Long createdAt) {
    }
}
