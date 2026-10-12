package com.ecommercebackend.Services.impl;

import com.ecommercebackend.Entity.Product;
import com.ecommercebackend.Helper.ResourceNotFoundException;
import com.ecommercebackend.Repositary.ProductRepository;
import com.ecommercebackend.Services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl  implements ProductService {


    ProductRepository productRepository;
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }





    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getLatestProducts() {
        return productRepository.findTop10ByOrderByCreatedAtDesc();

    }

    @Override
    public List<Product> getBestSellerProducts() {
        return productRepository.findByBestsellerTrue();
    }

    @Override
    public Page<Product> getRecommendedProducts(String category , Pageable pageable)  {
        Page<Product>  pages =   productRepository.findByCategoryIgnoreCase(category , pageable);
        return pages;
    }



    @Override
    public List<Product> getProductsByCategory(String category) {
        return List.of();
    }

    @Override
    public List<Product> getProductsBySubCategory(String subCategory) {
        return List.of();
    }


    @Override
    public List<Product> getProductsByPriceHighToLow() {
        return productRepository.findAllByOrderByPriceDesc();
    }

    @Override
    public List<Product> getProductsByPriceLowToHigh() {
        return productRepository.findAllByOrderByPriceAsc();
    }

    @Override
    public List<Product> getProductsByCategory(List<String> category) {
        return productRepository.findByCategoryIn(category);
    }

    @Override
    public List<Product> getProductsBySubCategory(List<String> subCategory) {
        return productRepository.findBySubCategoryIn(subCategory);
    }

    @Override
    public List<Product> getProductsCollectionByfilters(
            List<String> categories,
            List<String> subCategories,
            String sortBy
    ) {

        boolean hasCategories = categories != null && !categories.isEmpty();
        boolean hasSubCategories = subCategories != null && !subCategories.isEmpty();


        if (hasCategories && hasSubCategories) {
            if ("low-high".equals(sortBy)) {
                return productRepository
                        .findByCategoryInAndSubCategoryInOrderByPriceAsc(categories, subCategories);
            }
            if ("high-low".equals(sortBy)) {
                return productRepository
                        .findByCategoryInAndSubCategoryInOrderByPriceDesc(categories, subCategories);
            }
            return productRepository
                    .findByCategoryInAndSubCategoryInOrderByPriceAsc(categories, subCategories);
        }


        if (hasCategories) {
            if ("low-high".equals(sortBy)) {
                return productRepository.findByCategoryInOrderByPriceAsc(categories);
            }
            if ("high-low".equals(sortBy)) {
                return productRepository.findByCategoryInOrderByPriceDesc(categories);
            }
            return productRepository.findByCategoryIn(categories);
        }


        if (hasSubCategories) {
            if ("low-high".equals(sortBy)) {
                return productRepository.findBySubCategoryInOrderByPriceAsc(subCategories);
            }
            if ("high-low".equals(sortBy)) {
                return productRepository.findBySubCategoryInOrderByPriceDesc(subCategories);
            }
            return productRepository.findBySubCategoryIn(subCategories);
        }


        if ("low-high".equals(sortBy)) {
            return productRepository.findAllByOrderByPriceAsc();
        }
        if ("high-low".equals(sortBy)) {
            return productRepository.findAllByOrderByPriceDesc();
        }

        return productRepository.findAll();
    }


    @Override
    public List<Product> save(List<Product> product) {
        return productRepository.saveAll(product);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }


    @Override
    public Product getProductByDummyid(String id) {
        return productRepository.findByDummyid(id);
    }
}
