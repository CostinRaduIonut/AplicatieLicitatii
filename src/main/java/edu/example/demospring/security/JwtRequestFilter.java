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

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private MyUserdetailService myUserDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;
        // genereaza bearer + token, asa ca eliminam bearer sa ramana numa token
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
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
        // daca username nu e null, si token e geenrat, il validam
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//apelez metoda loaduserbyusername
            UserDetails userDetails = this.myUserDetailsService.loadUserByUsername(username);
            System.out.println(userDetails.getUsername());
            // daca este valid, se configureaza spring security pt auth
            if (jwtTokenUtil.validateJwtToken(jwtToken)) {

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // dupa ce am pus autentificarea in context, specific ca userul este auth
                // asa ca trimit ca securitatea este ok
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }

}