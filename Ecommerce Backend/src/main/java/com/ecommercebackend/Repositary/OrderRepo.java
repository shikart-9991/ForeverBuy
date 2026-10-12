package com.ecommercebackend.Repositary;

import com.ecommercebackend.Entity.Order;
import com.ecommercebackend.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Long> {

    Page<Order> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);


}
