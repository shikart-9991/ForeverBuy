package com.ecommercebackend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dummyid;

    @Column(nullable = false)
    private String name;

    private Double price;

    private String category;

    private String subCategory;

    @Column(length = 1000)
    private String description;

    // Example: "S,M,L,XL"
    private String sizes;

    private Boolean bestseller;

    private Long createdAt;

    // Cloudinary URLs: "url1,url2,url3"
    @Column(length = 3000)
    private String imageUrls;
}

