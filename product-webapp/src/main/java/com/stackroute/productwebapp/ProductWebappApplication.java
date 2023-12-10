package com.stackroute.productwebapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ProductWebappApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductWebappApplication.class, args);
	}

}
