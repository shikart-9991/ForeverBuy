package com.ecommercebackend.Services.impl;

import com.ecommercebackend.Entity.User;
import com.ecommercebackend.Repositary.UserRepository;
import com.ecommercebackend.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class userserviceimpl  implements UserServices {
    @Autowired
   private UserRepository userRepository;

     private final BCryptPasswordEncoder passwordEncoder;

    public userserviceimpl(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        return userRepository.save(user);
    }
}
