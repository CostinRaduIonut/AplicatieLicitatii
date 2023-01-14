package edu.example.demospring.security;


import edu.example.demospring.persitence.User;
import edu.example.demospring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
//service
@Service
public class MyUserdetailService implements UserDetailsService {
    //pt a injecta
    @Autowired
    UserRepository _userRepository;

    //creez corpul metodei
    //cauta in db dupa email
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=_userRepository.findByUsername(username);
        if(user ==null)
            throw new UsernameNotFoundException("Nu a fost gasit");
        var userDetails=new MyUserDetails(user);
        return  userDetails;
    }
}