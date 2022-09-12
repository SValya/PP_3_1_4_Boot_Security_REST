package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@Controller
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/admin")
    public String allUsers(ModelMap model) {
        List<User> users = userService.findAllUsers();
        List<Role> listRoles = userService.listRoles();
        model.addAttribute("users", users);
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("newUser", new User());
        model.addAttribute("listRoles", listRoles);
        return "admin";
    }

    @PostMapping("/update")
    public String update(@ModelAttribute("user") User user) {
        userService.addUser(user);
        return "redirect:/admin";
    }

    @PostMapping(value = "/delete")
    public String delete(@ModelAttribute("user") User user, @RequestParam(value = "id") Long id) {
        userService.deleteUserById(id);
        return "redirect:/admin";
    }

}


