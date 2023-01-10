package edu.example.demospring.persitence;

import edu.example.demospring.security.EncryptDecrypt;
import org.springframework.security.core.parameters.P;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users")
public class User extends EncryptDecrypt implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private String username;
    private String password;


    public User() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    //get si set simplu pt lucru cu baza de date
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return decrypt("Bar12345Bar12345", "RandomInitVector", password);
    }

    public void setPassword(String password) {
//        this.password=password;
        this.password = encrypt("Bar12345Bar12345", "RandomInitVector", password);
    }
}
