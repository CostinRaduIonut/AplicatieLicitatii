package edu.example.demospring.controller;

import edu.example.demospring.model.IstoricDTO;
import edu.example.demospring.persitence.Istoric;
import edu.example.demospring.repository.IstoricRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class IstoricController {
    private static Map<Long, IstoricDTO> productsMap = new HashMap<>();

    final IstoricRepository istoricRepository;

    public IstoricController(IstoricRepository istoricRepository) {
        this.istoricRepository = istoricRepository;
    }

    @RequestMapping(value = "/products/istoric", method = RequestMethod.GET)
    public ResponseEntity<Object> getIstoric() {
        List<IstoricDTO> collect = istoricRepository.findAll().stream().map(o -> new IstoricDTO(o.getId(), o.getId_username(), o.getId_prod(), o.getPret())).collect(Collectors.toList());

        return new ResponseEntity<>(collect, HttpStatus.OK);
    }

    @RequestMapping(value = "/products/putist", method = RequestMethod.POST)
    public ResponseEntity<Object> createIst(@RequestBody IstoricDTO istoricDTO) {
        productsMap.put(istoricDTO.getId(), istoricDTO);
        Istoric istoric = new Istoric();
        istoric.setId(istoricDTO.getId());
        istoric.setId_username(istoricDTO.getId_username());
        istoric.setId_prod(istoricDTO.getId_prod());
        istoric.setPret(istoricDTO.getPret());
        istoricRepository.save(istoric);
        return new ResponseEntity<>("Product created", HttpStatus.OK);
    }
}
