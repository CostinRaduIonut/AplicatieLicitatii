package edu.example.demospring.security;


import io.jsonwebtoken.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
//tine de token
@Component
public class JwtTokenUtil implements Serializable {
    //atribut ce ne ajuta sa serializam
    private static final long serialVersionUID = -2550185165626007488L;
//definim durata
    public static final long JWT_TOKEN_VALIDITY = 2000000;

    // static Key secret = MacProvider.generateKey();
    //daca nu e statica, creapa.
    static String secret="javainuse";

    //preia username folosind getClaimFromToken
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    //preia data de expirare folosind getClaimFromToken
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }
//preia claims in functie de ceva
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }
    //preia toate claims
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    //verificam expirarea
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    //genereaza token utilizand doGenerateToken care construieste token
    public String generateToken(MyUserDetails myUserDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, myUserDetails.getUsername(), myUserDetails.getId());
    }

//face jtw builder si claim
    private String doGenerateToken(Map<String, Object> claims, String subject, Long id) {

        return Jwts.builder().setClaims(claims).setSubject(subject).claim("id",id).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    //validare
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature: {}"+ e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token: {}"+ e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("JWT token is expired: {}"+ e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT token is unsupported: {}"+ e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty: {}"+ e.getMessage());
        }

        return false;
    }
}