package com.ecommercebackend.Services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.ecommercebackend.Services.imageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class imageServiceImpl implements imageService {

    @Autowired
    private Cloudinary cloudinary;
    public imageServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String uploadImage(MultipartFile productImage, String filename) {
        try{
            byte[] imageBytes = new byte[productImage.getInputStream().available()];
            productImage.getInputStream().read(imageBytes);
            cloudinary.uploader().upload(imageBytes, ObjectUtils.asMap(
                    "public_id", filename));
            return this.getUrlFromPublicId(filename);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public String getUrlFromPublicId(String publicId) {
        return cloudinary.url().transformation(
                        new Transformation<>()
                                .width(500)
                                .height(500)
                                .crop("fill"))
                .generate(publicId);
    }
    }

