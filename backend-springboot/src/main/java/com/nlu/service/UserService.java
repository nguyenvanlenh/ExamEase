package com.nlu.service;

import java.util.List;

import com.nlu.model.dto.response.UserResponse;

public interface UserService {
	
	UserResponse getUser(Long id);
	List<UserResponse> getAllUsers();

}
