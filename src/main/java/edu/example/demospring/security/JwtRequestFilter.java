package edu.example.demospring.security;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
//clasa care se apeleaza la fiecare apelare
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private MyUserdetailService myUserDetailsService;
    //verificam daca
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;
        // verific daca am token si daca incepe cu bearer, apoi iau token fara bearer
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                //incerc sa iau token, altfel arunca exceptie
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                logger.warn("Nu se poate genera token");
            } catch (ExpiredJwtException e) {
                System.out.println("Tokn terminat");
            }
        } else {
            logger.warn("Tokenul nu incepe cu bearer");
        }
        logger.warn("JWT token");
        // daca tokentu si getcontext nu e null, creez context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//apelez metoda loaduserbyusername ca sa pun eu username
            UserDetails userDetails = this.myUserDetailsService.loadUserByUsername(username);
            System.out.println(userDetails.getUsername());
            // daca este valid, se configureaza spring security pt auth
            if (jwtTokenUtil.validateJwtToken(jwtToken)) {
//setez datele de auth si ii zic ca e ok
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // dupa ce am pus autentificarea in context, specific ca userul este auth
                // asa ca trimit ca securitatea este ok
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        //invoca urmatoru filtru daca mai exista, daca nu, se ocupa de request
        filterChain.doFilter(request, response);
    }

}