package com.nlu.service;

import com.nlu.model.request.LoginRequest;
import com.nlu.model.request.RegisterRequest;
import com.nlu.model.response.AuthenticationResponse;

public interface AuthService {
	
	AuthenticationResponse login(LoginRequest request);
	void register(RegisterRequest request);

}
