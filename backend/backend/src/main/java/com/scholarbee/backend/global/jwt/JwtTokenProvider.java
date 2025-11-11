package com.scholarbee.backend.global.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Key key = Keys.hmacShaKeyFor("scholarbee-secret-key-for-jwt-256bit-example".getBytes());
    private final long accessTokenValidity = 3600_000; // 1시간 (ms 단위)

    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + accessTokenValidity);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public long getAccessTokenValiditySeconds() {
        return accessTokenValidity / 1000;
    }
}