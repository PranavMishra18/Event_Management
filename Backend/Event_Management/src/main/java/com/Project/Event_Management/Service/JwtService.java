package com.Project.Event_Management.Service;

import com.Project.Event_Management.Entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final String SECRET_KEY = "c65dd23e20a7a579467c689021b6f357080cf3eed5948d7a65cff81549026af5";

    public String extractUsername(String token){
        return extractClaim(token,Claims::getSubject);
    }

    public boolean isValid(String token, UserDetails user) {
        String emailFromToken = extractUsername(token);
        return (emailFromToken.equals(((User) user).getEmail())) && !isTokenExpired(token);
    }



    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims,T> resolver){

        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);

    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getSigninKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name()); // Add role to the claims
        claims.put("userId", user.getId());

        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) // 24 hours
                .signWith(getSigninKey())
                .compact();
    }


    private SecretKey getSigninKey(){
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);

        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generatePasswordResetToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("otp_verified", true);
        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000)) // 15 minutes expiry
                .signWith(getSigninKey())
                .compact();
    }

    public boolean isPasswordResetTokenValid(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("otp_verified", Boolean.class) != null && claims.get("otp_verified", Boolean.class);
    }

}
