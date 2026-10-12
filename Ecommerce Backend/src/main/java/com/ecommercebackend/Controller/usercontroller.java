package com.ecommercebackend.Controller;

import com.ecommercebackend.Entity.User;

import com.ecommercebackend.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class usercontroller {

    @Autowired
    private final UserServices userService;

    public usercontroller(UserServices userService) {
        this.userService = userService;
    }


    // TEMP API to create user
    @PostMapping("/create")
    public User createUser(@RequestBody User user) {

        return userService.createUser(user);
    }
}
