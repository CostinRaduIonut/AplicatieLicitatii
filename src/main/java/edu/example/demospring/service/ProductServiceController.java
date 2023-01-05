package edu.example.demospring.service;

import edu.example.demospring.dao.ProductServiceDAO;
import edu.example.demospring.model.AuthModel;
import edu.example.demospring.model.ProductDTO;
import edu.example.demospring.persitence.Product;
import edu.example.demospring.persitence.User;
import edu.example.demospring.repository.ProductRepository;
import edu.example.demospring.repository.UserRepository;
import edu.example.demospring.security.MyUserDetails;
import edu.example.demospring.utils.Convertor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ProductServiceController {
    private static Map<Long, ProductDTO> productsMap = new HashMap<>();

    final ProductRepository productRepository;

    final ProductServiceDAO productServiceDAO;


    public ProductServiceController(ProductRepository productRepository, ProductServiceDAO productServiceDAO) {
        this.productRepository = productRepository;
        this.productServiceDAO = productServiceDAO;
    }

    @RequestMapping(value = "/products", method = RequestMethod.GET)
    public ResponseEntity<Object> getProducts() {
        List<ProductDTO> collect = productRepository.findAll().stream().map(o -> new ProductDTO(o.getId(), o.getId_owner(), o.getName(), o.getPret(), o.getCategorie(), o.getDescriere(), o.getImg(), o.getData(), o.getExpirat(), o.getCastigator())).collect(Collectors.toList());

        return new ResponseEntity<>(collect, HttpStatus.OK);
    }

    @RequestMapping(value = "/products", method = RequestMethod.POST)
    public ResponseEntity<Object> createProduct(@RequestBody ProductDTO productDTO) {
        productsMap.put(productDTO.getId(), productDTO);
        Product product = new Product();
        product.setId(productDTO.getId());
        product.setId_owner(productDTO.getId_owner());
        product.setName(productDTO.getName());
        product.setPret(productDTO.getPret());
        product.setCategorie(productDTO.getCategorie());
        product.setDescriere(productDTO.getDescriere());
        product.setImg(productDTO.getImg());
        product.setData(String.valueOf(System.currentTimeMillis()));
        productRepository.save(product);
        return new ResponseEntity<>("Product created", HttpStatus.OK);
    }

    @RequestMapping(value = "/products/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getProduct(@PathVariable("id") Long id) {
        return new ResponseEntity<>(productRepository.findById(id).map(p -> new ProductDTO(p.getId(), p.getId_owner(), p.getName(), p.getPret(), p.getCategorie(), p.getDescriere(), p.getImg(), p.getData(), p.getExpirat(), p.getCastigator())).orElse(null), HttpStatus.OK);
    }

    @RequestMapping(value = "/products/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updatePrice(@PathVariable("id") Long id, @RequestBody ProductDTO productDTO) {
        productRepository.findById(id).ifPresent(p -> {
            p.setPret(productDTO.getPret());
            p.setCastigator(productDTO.getCastigator());
            productRepository.save(p);
        });
        productsMap.remove(id);
        productsMap.put(id, productDTO);
        return new ResponseEntity<>("Pret licitat", HttpStatus.OK);
    }

    @RequestMapping(value = "/products/expirat/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updateExpirat(@PathVariable("id") Long id, @RequestBody ProductDTO productDTO) {
        productRepository.findById(id).ifPresent(p -> {
            p.setExpirat(productDTO.getExpirat());
            productRepository.save(p);
        });
        productsMap.remove(id);
        productsMap.put(id, productDTO);
        return new ResponseEntity<>("Licitatie expirata", HttpStatus.OK);
    }

    @RequestMapping(value = "/products/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id) {
        ProductDTO remove = productsMap.remove(id);
        productRepository.deleteById(id);
        return new ResponseEntity<>(Optional.ofNullable(remove).map(p -> "Product deleted").orElse("Product not found"), HttpStatus.OK);
    }

    @RequestMapping(value = "/products/edit/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updateProduct(@PathVariable("id") Long id, @RequestBody ProductDTO productDTO) {
        productRepository.findById(id).ifPresent(p -> {
            p.setName(productDTO.getName());
            p.setPret(productDTO.getPret());
            p.setCategorie(productDTO.getCategorie());
            p.setDescriere(productDTO.getDescriere());
            productRepository.save(p);
        });
        productsMap.remove(id);
        productsMap.put(id, productDTO);
        return new ResponseEntity<>("Product", HttpStatus.OK);
    }
}

