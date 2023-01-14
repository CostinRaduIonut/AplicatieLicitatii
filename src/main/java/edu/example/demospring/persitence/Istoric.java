package edu.example.demospring.persitence;

import javax.persistence.*;

@Entity
@Table(name = "istoric")
public class Istoric {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    private long id_username;
    private long id_prod;
    private long pret;

    public Istoric(Long id, long id_username, long id_prod, long pret) {
        this.id = id;
        this.id_username = id_username;
        this.id_prod = id_prod;
        this.pret = pret;
    }

    public Istoric() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getId_username() {
        return id_username;
    }

    public void setId_username(long id_username) {
        this.id_username = id_username;
    }

    public long getId_prod() {
        return id_prod;
    }

    public void setId_prod(long id_prod) {
        this.id_prod = id_prod;
    }

    public long getPret() {
        return pret;
    }

    public void setPret(long pret) {
        this.pret = pret;
    }
}
