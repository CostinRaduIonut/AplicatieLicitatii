package edu.example.demospring.model;

public class ProductDTO {

    private long id;
    private Long id_owner;
    private String name;
    private long pret;
    private String categorie;
    private String descriere;
    private String img;
    private String data;
    private boolean expirat;
    private String castigator;

    public ProductDTO() {
    }

    public ProductDTO(long id, Long id_owner, String name, long pret, String categorie, String descriere, String img, String data, boolean expirat, String castigator) {
        this.id = id;
        this.id_owner=id_owner;
        this.name = name;
        this.pret = pret;
        this.categorie = categorie;
        this.descriere = descriere;
        this.img = img;
        this.data = data;
        this.expirat = expirat;
        this.castigator=castigator;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Long getId_owner() {
        return id_owner;
    }
    public void setId_owner(Long id_owner) {
        this.id_owner = id_owner;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getPret() {
        return pret;
    }

    public void setPret(long pret) {
        this.pret = pret;
    }


    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void setExpirat(boolean expirat) {
        this.expirat = expirat;
    }

    public boolean getExpirat() {
        return expirat;
    }
    public String getCastigator() {
        return castigator;
    }

    public void setCastigator(String castigator) {
        this.castigator = castigator;
    }
}
