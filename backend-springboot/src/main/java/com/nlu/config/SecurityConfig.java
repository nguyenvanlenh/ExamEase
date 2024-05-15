package com.nlu.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;	
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.nlu.model.enumeration.ERole;
import com.nlu.security.jwt.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig{
	
	
	private final static String[] PUBLIC_ENDPOINTS = {
			"/api/auth/login",
			"/api/auth/register",
			"/api/exams/**",
			"/api/exam-numbers/**",
			"/api/user_answers/**",
			"/api/students/**"
	};
	private final static String[] SWAGGER_ENDPOINTS = {
			"swagger-ui.html",
			"/swagger-ui/**",
			"/v3/api-docs/**",
            "/javainuse-openapi/**"
	};
	
	@Autowired private UserDetailsService userDetailsService;
	
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
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.disable())
                .csrf(csrf -> csrf.disable())
                // không lưu trữ phiên người dùng trên server
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                
                .authorizeHttpRequests(request ->
                        request.requestMatchers( PUBLIC_ENDPOINTS).permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/students/import")
                                .hasAnyRole(ERole.TEACHER.toString(), ERole.ROOT.toString())
                                .anyRequest().authenticated()
                )
                // thêm filter jwt trước usernamepasswordAuthenticationFilter nhằm ưu tiên cho jwt hơn là username - password
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                
//                .exceptionHandling(handling -> {
//                handling.authenticationEntryPoint(new JwtAuthenticationEntryPoint());
//                })
                ;
        
      return http.build();
	}
		
	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().requestMatchers(SWAGGER_ENDPOINTS);
	}
}
