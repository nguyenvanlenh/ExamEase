package com.nlu.service.imp;

import java.util.List;

import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.nlu.model.dto.response.UserResponse;
import com.nlu.model.entity.User;
import com.nlu.repository.UserRepository;
import com.nlu.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

	private final UserRepository userRepository;

	@PostAuthorize("hasRole('ADMIN') || returnObject.code == authentication.name")
	@Override
	public UserResponse getUser(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found"));
		return new UserResponse().fromEntity(user);

	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@Override
	public List<UserResponse> getAllUsers() {
		List<UserResponse> listUserResponses = userRepository.findAll().stream()
				.map((user) -> new UserResponse().fromEntity(user))
				.toList();
		return listUserResponses;
	}

}
