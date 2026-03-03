package com.godream.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GoDreamApplication {

    public static void main(String[] args) {
        // Esta línea arranca todo el ecosistema de Spring Boot
        SpringApplication.run(GoDreamApplication.class, args);

        System.out.println("=======================================");
        System.out.println("GoDream Backend iniciado con éxito");
        System.out.println("API: http://localhost:8080/api/leads");
        System.out.println("H2 Console: http://localhost:8080/h2-console");
        System.out.println("=======================================");
    }

}