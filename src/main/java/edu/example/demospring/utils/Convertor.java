package edu.example.demospring.utils;

import edu.example.demospring.model.AuthModel;
import edu.example.demospring.persitence.User;

public class Convertor {
    public static User toUser(AuthModel authModel) {
        var user = new User();
        user.setUsername(authModel.username);
        user.setPassword(authModel.password);
        return user;
    }
}
