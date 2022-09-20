package com.chickenbandits.daeily;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class DaeilyApplication {

    @GetMapping("/")
    public String hello() {
        return "Test Hello";
    }

    public static void main(String[] args) {
        SpringApplication.run(DaeilyApplication.class, args);
    }

}
