package com.ecommercebackend.Repositary;

import com.ecommercebackend.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findTop10ByOrderByCreatedAtDesc();
    List<Product> findByBestsellerTrue();
List<Product> findByCategoryIn(List<String> categories);
List<Product> findBySubCategoryIn(List<String> subCategories);

Page<Product>findByCategoryIgnoreCase(String category , Pageable pageable);

   List<Product> findAllByOrderByPriceDesc();
   List<Product> findAllByOrderByPriceAsc();
    List<Product> findBySubCategoryInOrderByPriceAsc(List<String> subCategories);
    List<Product> findBySubCategoryInOrderByPriceDesc(List<String> subCategories);
    List<Product> findByCategoryInOrderByPriceAsc(List<String> Categories);
    List<Product> findByCategoryInOrderByPriceDesc(List<String> Categories);

   List<Product> findByCategoryInAndSubCategoryInOrderByPriceAsc(List<String> category, List<String> subCategory);
   List<Product> findByCategoryInAndSubCategoryInOrderByPriceDesc(List<String> category, List<String> subCategory);
   Product findByDummyid(String dummyid);




}
