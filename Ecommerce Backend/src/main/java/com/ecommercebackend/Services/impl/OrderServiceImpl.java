package com.ecommercebackend.Services.impl;

import com.ecommercebackend.DTO.CartItemDto;
import com.ecommercebackend.DTO.PlaceOrderDto;
import com.ecommercebackend.Entity.Address;
import com.ecommercebackend.Entity.Order;
import com.ecommercebackend.Entity.OrderItem;
import com.ecommercebackend.Entity.User;
import com.ecommercebackend.Repositary.AddressRepo;
import com.ecommercebackend.Repositary.OrderRepo;
import com.ecommercebackend.Repositary.UserRepository;
import com.ecommercebackend.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AddressRepo addressRepo;

    @Autowired
    OrderRepo orderRepo;


    @Override
    public Order plateOrder(PlaceOrderDto req) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
       User user = userRepository.findByEmail(email);


        Address address = new Address();
        address.setFirstName(req.getAddress().getFirstName());
        address.setLastName(req.getAddress().getLastName());
        address.setCity(req.getAddress().getCity());
        address.setState(req.getAddress().getState());
        address.setCountry(req.getAddress().getCountry());
        address.setZipCode(req.getAddress().getZipCode());
        address.setStreet(req.getAddress().getStreet());
        address.setPhoneNumber(req.getAddress().getPhoneNumber());

        address =  addressRepo.save(address);



        Order order = new Order();
        order.setAddress(address);
        order.setUser(user);// set user with it order


        order.setOrderStatus("PLACED");
        order.setPaymentStatus("DONE");
        order.setPaymentType(req.getPaymentType());
        order.setCreatedAt(System.currentTimeMillis());
        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0;

       //creating the order now on

        for(CartItemDto item : req.getItems()){
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(item.getId());
            orderItem.setProductName(item.getName());
            orderItem.setPrice(item.getPrice());
            orderItem.setQuantity(item.getQty());
            orderItem.setSize(item.getSize());

            if (item.getImageUrls() != null && !item.getImageUrls().isEmpty()) {
                orderItem.setImageUrl(item.getImageUrls().get(0));
            }

            orderItem.setOrder(order);

            totalAmount += item.getPrice() * item.getQty();
            orderItems.add(orderItem);
        }

        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems);


        return orderRepo.save(order);

    }

    @Override
    public Page<Order> getAllOrders(int page, int size , User user) {
        Pageable pageable = PageRequest.of(page, size);
        return orderRepo.findByUserOrderByCreatedAtDesc(user , pageable);
    }
}
