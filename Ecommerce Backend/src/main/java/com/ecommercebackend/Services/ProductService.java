package com.ecommercebackend.Services;

import com.ecommercebackend.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
public interface ProductService {
List<Product> findAll();
List<Product> getLatestProducts();
List<Product> getBestSellerProducts();

Page<Product> getRecommendedProducts(String category , Pageable pageable);

List<Product> getProductsByCategory(String category);
List<Product> getProductsBySubCategory(String subCategory);
List<Product> getProductsByPriceHighToLow();
List<Product> getProductsByPriceLowToHigh();
List<Product> getProductsByCategory(List<String> category);
List<Product> getProductsBySubCategory(List<String> subCategory);
List<Product> getProductsCollectionByfilters(List<String> categories, List<String> subCategories , String sortBy);


List<Product> save(List<Product> product);
Product getProductById(Long id);
Product getProductByDummyid(String id);


}
