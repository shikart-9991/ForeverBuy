package com.ecommercebackend.Controller;

import com.ecommercebackend.DTO.ProductDto;
import com.ecommercebackend.Entity.Product;
import com.ecommercebackend.Helper.GettingImg;
import com.ecommercebackend.Services.ProductService;
import com.ecommercebackend.Services.impl.imageServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/product")
public class ProductController {

    ProductService productService;
    imageServiceImpl imageService;
    GettingImg gettingImg;
     ProductController(ProductService productService , imageServiceImpl imageService ,  GettingImg gettingImg) {
         this.productService = productService;
         this.imageService = imageService;
         this.gettingImg = gettingImg;

     }




    @GetMapping("/latest")
    public ResponseEntity<List<ProductDto>> getlatest() {

        List<Product> products = productService.getLatestProducts();
        List<ProductDto> responseList = new ArrayList<>();

        for (Product product : products) {

            ProductDto productDto = new ProductDto();
            productDto.setId(product.getId());
            productDto.setDummyid(product.getDummyid());
            productDto.setName(product.getName());
            productDto.setDescription(product.getDescription());
            productDto.setPrice(product.getPrice());
            productDto.setCategory(product.getCategory());
            productDto.setSubCategory(product.getSubCategory());
            productDto.setBestseller(product.getBestseller());
            productDto.setCreatedAt(product.getCreatedAt());
            productDto.setSizes(product.getSizes());
            System.out.println(product.getSizes());


            List<String> images = new ArrayList<>();
            String imageData = product.getImageUrls(); // "p_img52"

            for (String publicId : imageData.split(",")) {
                images.add(imageService.getUrlFromPublicId(publicId.trim()));
            }

            productDto.setImageUrls(images);

            responseList.add(productDto);
        }

        return ResponseEntity.ok(responseList);
    }
    @GetMapping("/bestSeller")
    public ResponseEntity<List<ProductDto>> getbestseller() {
         List<Product> products = productService.getBestSellerProducts();
         List<ProductDto> responseList = new ArrayList<>();

         for(Product product : products){
             ProductDto productDto = new ProductDto();
             productDto.setId(product.getId());
             productDto.setDummyid(product.getDummyid());
             productDto.setName(product.getName());
             productDto.setDescription(product.getDescription());
             productDto.setPrice(product.getPrice());
             productDto.setCategory(product.getCategory());
             productDto.setSubCategory(product.getSubCategory());
             productDto.setBestseller(product.getBestseller());

             productDto.setCreatedAt(product.getCreatedAt());
             productDto.setSizes(product.getSizes());
             System.out.println(product.getSizes());

             String imageData = product.getImageUrls();
             productDto.setImageUrls(gettingImg.GettingImgs(imageData));

             responseList.add(productDto);
         }
         return ResponseEntity.ok(responseList);
    }







    @GetMapping("/filter")
    public ResponseEntity<List<ProductDto>> getcollection(
            @RequestParam(required = false) List<String> categories,
            @RequestParam(required = false) List<String> subCategories,
            @RequestParam(defaultValue = "relevant") String sortBy
    ) {
        List<Product> products =
                productService.getProductsCollectionByfilters(
                        categories, subCategories, sortBy
                );

        List<ProductDto> responseList = new ArrayList<>();
        for(Product product : products){
            ProductDto productDto = new ProductDto();
            productDto.setId(product.getId());
            productDto.setDummyid(product.getDummyid());
            productDto.setName(product.getName());
            productDto.setDescription(product.getDescription());
            productDto.setPrice(product.getPrice());
            productDto.setCategory(product.getCategory());
            productDto.setSubCategory(product.getSubCategory());
            productDto.setBestseller(product.getBestseller());
            productDto.setCreatedAt(product.getCreatedAt());
            productDto.setSizes(product.getSizes());

            System.out.println(product.getSizes());
            String imageData = product.getImageUrls();
            productDto.setImageUrls(gettingImg.GettingImgs(imageData));
            responseList.add(productDto);
        }



        return ResponseEntity.ok(responseList);
    }

@GetMapping("/{id}")
    public ResponseEntity<ProductDto> getproduct(@PathVariable Long id) {
    Product prd = new Product();
    prd = productService.getProductById(id);
    ProductDto productDto = new ProductDto();
    productDto.setId(prd.getId());
    productDto.setDummyid(prd.getDummyid());
    productDto.setName(prd.getName());
    productDto.setDescription(prd.getDescription());
    productDto.setPrice(prd.getPrice());
    productDto.setCategory(prd.getCategory());
    productDto.setSubCategory(prd.getSubCategory());
    productDto.setBestseller(prd.getBestseller());
    productDto.setCreatedAt(prd.getCreatedAt());
    productDto.setSizes(prd.getSizes());
    System.out.println(prd.getSizes());
    String imageData = prd.getImageUrls();
    productDto.setImageUrls(gettingImg.GettingImgs(imageData));
    return ResponseEntity.ok(productDto);

}

    @GetMapping("/by-category")
    public ResponseEntity<Page<ProductDto>> getrelated(
            @RequestParam String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size
    ) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Product> productPage =
                productService.getRecommendedProducts(category, pageable);

        Page<ProductDto> dtoPage = productPage.map(product -> {
            ProductDto productDto = new ProductDto();
            productDto.setId(product.getId());
            productDto.setDummyid(product.getDummyid());
            productDto.setName(product.getName());
            productDto.setDescription(product.getDescription());
            productDto.setPrice(product.getPrice());
            productDto.setCategory(product.getCategory());
            productDto.setSubCategory(product.getSubCategory());
            productDto.setBestseller(product.getBestseller());
            productDto.setCreatedAt(product.getCreatedAt());
            productDto.setSizes(product.getSizes());

            String imageData = product.getImageUrls();
            productDto.setImageUrls(gettingImg.GettingImgs(imageData));

            return productDto;
        });

        return ResponseEntity.ok(dtoPage);
    }












    @PostMapping("/add")
    public ResponseEntity<List<Product>> addProduct(@RequestBody List<Product> products) {
        List<Product> saved = productService.save(products);
        return ResponseEntity.ok(saved);
    }

}
