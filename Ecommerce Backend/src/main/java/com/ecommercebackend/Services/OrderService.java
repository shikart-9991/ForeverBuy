package com.ecommercebackend.Services;

import com.ecommercebackend.DTO.PlaceOrderDto;
import com.ecommercebackend.Entity.Order;
import com.ecommercebackend.Entity.User;
import org.springframework.data.domain.Page;

public interface OrderService {
    Order plateOrder(PlaceOrderDto req);

    Page<Order> getAllOrders(int page , int size , User user);
}
