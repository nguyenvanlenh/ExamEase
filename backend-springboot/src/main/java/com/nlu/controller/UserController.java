package com.nlu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nlu.model.dto.response.UserResponse;
import com.nlu.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;
	@GetMapping("/{id}")
	public UserResponse getUserInfor(@PathVariable(name = "id") Long id) {
		return userService.getUser(id);
	}
}
