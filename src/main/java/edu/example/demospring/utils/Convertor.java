package edu.example.demospring.utils;

import edu.example.demospring.model.UserDTO;
import edu.example.demospring.persitence.User;

public class Convertor {
    public static User toUser(UserDTO userDTO) {
        var user = new User();
        user.setUsername(userDTO.username);
        user.setPassword(userDTO.password);
        return user;
    }
}
