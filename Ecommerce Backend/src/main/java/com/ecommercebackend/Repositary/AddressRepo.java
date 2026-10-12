package com.ecommercebackend.Repositary;

import com.ecommercebackend.Entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepo extends JpaRepository<Address, Long> {


}
