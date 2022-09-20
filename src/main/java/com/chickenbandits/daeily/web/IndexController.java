package com.chickenbandits.daeily.web;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class IndexController {

    @GetMapping("/api")
    public String index() {
        return "index";
    }

    @GetMapping("/api/hello")
    public String hello() { return "Hi. This is Spring speaking."; }
}
