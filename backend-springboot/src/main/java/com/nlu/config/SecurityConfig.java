package com.nlu.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.nlu.model.enumeration.ERole;
import com.nlu.security.jwt.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
	
	
	private final String[] PUBLIC_ENDPOINTS = {
			"/api/auth/login",
			"/api/auth/register"
	};
	private final String[] SWAGGER_ENDPOINTS = {
			"swagger-ui.html",
			"/swagger-ui/**",
			"/v3/api-docs/**",
            "/javainuse-openapi/**"
	};
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}
	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        .cors(cors -> cors.disable())
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(request -> 
                request.requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
		                .requestMatchers(HttpMethod.POST,"/api/student/excel/upload")
		                .hasAnyAuthority(ERole.TEACHER.toString(),ERole.ROOT.toString())
		                .anyRequest().authenticated()
		                )
        
        .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
      return http.build();
	}
		
	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().requestMatchers(SWAGGER_ENDPOINTS);
	}
	

}
