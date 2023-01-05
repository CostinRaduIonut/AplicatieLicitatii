package edu.example.demospring.repository;

import edu.example.demospring.persitence.Product;
import edu.example.demospring.persitence.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
//creez metodele
    List<User> findAll();

    User findByUsername(String username);
}
