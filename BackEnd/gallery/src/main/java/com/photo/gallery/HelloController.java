package com.photo.gallery;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/Hii")
    public String sayHi(){
        return "Hii " ;
    }

    @GetMapping("/contact")
    public String sayContact(){
        return "Contact" ;
    }

    @GetMapping("/aboutus")
    public String sayAbout(){
        return "About" ;
    }
}
