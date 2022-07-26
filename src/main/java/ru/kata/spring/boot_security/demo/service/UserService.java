package ru.kata.spring.boot_security.demo.service;


import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<User> findAllUsers();

    void addUser(User user);

    void deleteUserById(Long id);

    void edit(User user);

    User findUserById(Long id);

    User getCurrentUser();

    List<Role> listRoles();

    void registerDefaultUser(User user);
}
