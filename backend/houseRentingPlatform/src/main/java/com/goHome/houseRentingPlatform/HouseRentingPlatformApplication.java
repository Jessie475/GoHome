package com.goHome.houseRentingPlatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class HouseRentingPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(HouseRentingPlatformApplication.class, args);
	}

}
