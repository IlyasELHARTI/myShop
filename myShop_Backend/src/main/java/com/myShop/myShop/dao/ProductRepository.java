package com.myShop.myShop.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myShop.myShop.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
