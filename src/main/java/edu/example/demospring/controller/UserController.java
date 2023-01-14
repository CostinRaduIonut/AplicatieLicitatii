package edu.example.demospring.controller;

import edu.example.demospring.model.UserDTO;
import edu.example.demospring.repository.UserRepository;
import edu.example.demospring.security.EncryptDecrypt;
import edu.example.demospring.security.JwtTokenUtil;
import edu.example.demospring.security.MyUserDetails;
import edu.example.demospring.utils.Convertor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/User")

public class UserController extends EncryptDecrypt {
    @Autowired
    UserRepository userRepository;

    public UserController() {

    }

    @PostMapping(path = "/Register")
    public void Register(@RequestBody UserDTO userDTO) {
//primeste ca si parametru un auth model si in user imi pune userul
        //salveaza in db
        var user = Convertor.toUser(userDTO);
        userRepository.save(user);
    }

    @PostMapping(path = "/Login")
    public String Login(@RequestBody UserDTO userDTO) {

        var user = Convertor.toUser(userDTO);
        var dbUser = userRepository.findByUsername(user.getUsername());
        //tratez exceptiile
        if (dbUser == null) {
            return "Not here bro";
        }
        if (!dbUser.getPassword().equals(user.getPassword())) {
            return "wrong password";
        }

        JwtTokenUtil token = new JwtTokenUtil();
        MyUserDetails userDetails = new MyUserDetails(dbUser);
        var generatedToken = token.generateToken(userDetails);
        return generatedToken;
    }

}
