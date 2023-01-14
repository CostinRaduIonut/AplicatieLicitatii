package edu.example.demospring.repository;

import edu.example.demospring.persitence.Istoric;
import edu.example.demospring.persitence.Product;
import edu.example.demospring.persitence.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface IstoricRepository extends CrudRepository<Istoric, Long> {
    List<Istoric> findAll();

    Optional<Istoric> findById(Long id);
}

