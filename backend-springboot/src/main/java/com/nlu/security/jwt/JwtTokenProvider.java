package com.nlu.security.jwt;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.nlu.security.CustomUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtTokenProvider {

	@Value("${nlu.jwt.secret}")
	private String SECRET_KEY;
	@Value("${nlu.jwt.expiration}")
	private Long JWT_TIME_EXPIRATION;
	private Key getSecretKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
	public String generateToken(CustomUserDetails userDetails) {
		Date now = new Date();
		Date dateExpiration = new Date(now.getTime() + JWT_TIME_EXPIRATION);

		return Jwts.builder()
				.setSubject(userDetails.getUsername())
				.setIssuedAt(now)
				.setExpiration(dateExpiration)
				.signWith(getSecretKey(), SignatureAlgorithm.HS512)
				.compact();
	}

	public String getUsernameFromJwt(String token) {
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(getSecretKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
		return claims.getSubject();
	}

	public boolean validateToken(String authToken) {

		try {
			Jwts.parserBuilder()
			.setSigningKey(getSecretKey())
			.build()
			.parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			// Xử lý ngoại lệ khi xác thực chữ ký của chuỗi JWT thất bại
			log.error("Invalid JWT signature");
			log.trace("Invalid JWT signature trace", e);
		} catch (MalformedJwtException e) {
			// Xử lý ngoại lệ khi chuỗi JWT không đúng định dạng
			log.error("Malformed JWT token");
			log.trace("Malformed JWT token trace", e);
		} catch (ExpiredJwtException e) {
			// Xử lý ngoại lệ khi chuỗi JWT đã hết hạn
			log.error("Expired JWT token");
			log.trace("Expired JWT token trace", e);
		} catch (UnsupportedJwtException e) {
			// Xử lý ngoại lệ khi chuỗi JWT không được hỗ trợ
			log.error("Unsupported JWT token");
			log.trace("Unsupported JWT token trace", e);
		} catch (IllegalArgumentException e) {
			// Xử lý ngoại lệ khi đối số không hợp lệ
			log.error("JWT token claims string is empty.");
			log.trace("JWT token claims string is empty trace", e);
		}

		return false;
	}

}
