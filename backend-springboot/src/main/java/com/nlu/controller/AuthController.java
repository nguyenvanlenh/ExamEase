package com.nlu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.nlu.model.request.LoginRequest;
import com.nlu.model.request.RegisterRequest;
import com.nlu.model.response.AuthenticationResponse;
import com.nlu.repository.RoleRepository;
import com.nlu.service.AuthService;
import com.nlu.utils.AuthenticationUtils;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired private AuthService authService;
	
	@PostMapping("/register")
	@ResponseStatus(code = HttpStatus.CREATED)
	public void register(@RequestBody RegisterRequest request) {
		authService.register(request);
	}
	
	@PostMapping("/login")
	@ResponseStatus(code = HttpStatus.OK)
	public AuthenticationResponse login(@RequestBody LoginRequest request) {
		return authService.login(request);
	}
	
}
