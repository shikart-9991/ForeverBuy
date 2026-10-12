package com.ecommercebackend.Services;

import org.springframework.web.multipart.MultipartFile;

public interface imageService {
    String uploadImage(MultipartFile productImage ,  String fileName);
    String getUrlFromPublicId(String publicId);
}
