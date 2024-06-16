package com.nlu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.data.web.SortDefault.SortDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nlu.model.dto.response.ResponseData;
import com.nlu.model.dto.response.UserResponse;
import com.nlu.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;
	@GetMapping("/{id}")
	public ResponseData getUserInfor(@PathVariable(name = "id") Long id) {
		UserResponse data = userService.getUser(id);
		return ResponseData.builder()
				.status(HttpStatus.OK.value())
				.message("User infor")
				.data(data)
				.build();
	}
	public ResponseData getAllUsers(
			@PageableDefault(page = 0, size = 10) 
			@SortDefaults(
			@SortDefault(direction = Sort.Direction.ASC, sort = {"fullname"})
	) Pageable pageable
			) {
		List<UserResponse> data = userService.getAllUsers(pageable);
		return ResponseData.builder()
				.status(HttpStatus.OK.value())
				.message("Users infor")
				.data(data)
				.build();
	}
}
