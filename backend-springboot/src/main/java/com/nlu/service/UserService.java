package com.nlu.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.nlu.model.dto.response.UserResponse;

public interface UserService {
	
	UserResponse getUser(Long id);
	List<UserResponse> getAllUsers(Pageable pageable);

}
