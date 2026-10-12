package com.ecommercebackend.Helper;

import com.ecommercebackend.Services.imageService;
import jakarta.persistence.Column;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GettingImg {

    private final imageService imageService;

    @Autowired
    public GettingImg(imageService imageService) {
        this.imageService = imageService;
    }

    public List<String> GettingImgs(String imageData) {
        List<String> images = new ArrayList<>();

        if (imageData == null || imageData.isBlank()) {
            return images;
        }

        for (String publicId : imageData.split(",")) {
            images.add(imageService.getUrlFromPublicId(publicId.trim()));
        }
        return images;
    }
}
