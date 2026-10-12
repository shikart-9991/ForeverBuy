package com.ecommercebackend.Controller;


import com.ecommercebackend.DTO.PlaceOrderDto;
import com.ecommercebackend.Entity.Order;
import com.ecommercebackend.Entity.User;
import com.ecommercebackend.Repositary.OrderRepo;
import com.ecommercebackend.Repositary.ProductRepository;
import com.ecommercebackend.Repositary.UserRepository;
import com.ecommercebackend.Services.OrderService;
import com.ecommercebackend.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
@RestController
@RequestMapping("/api/products")
public class OrderController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @PostMapping("/orders")
    public ResponseEntity<Order> getOrders(@RequestBody PlaceOrderDto placeOrderDto) {


        Order order = orderService.plateOrder(placeOrderDto);
        return new ResponseEntity<>(order, HttpStatus.OK);

    }

    @GetMapping("/orders")
    public ResponseEntity<Page<Order>> getAllOrders(
            @RequestParam int page, @RequestParam int size
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName());
         Page<Order> pages = orderService.getAllOrders(page ,size , user);
         return new ResponseEntity<>(pages, HttpStatus.OK);
    }


    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> optionalOrder = orderRepo.findById(id);
        if (optionalOrder.isPresent()) {
            return ResponseEntity.ok(optionalOrder.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
