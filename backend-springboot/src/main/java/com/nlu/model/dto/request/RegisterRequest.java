package com.nlu.model.dto.request;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterRequest {
	@NotBlank(message = "username cannot be blank")
	@Length(min = 5, max = 20, message = "username must be between 5-20 characters")
	private String username;
	@NotBlank(message = "password cannot be blank")
	@Length(min = 8, max = 20, message = "password must be between 8-20 characters")
	private String password;
	@Email(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "invalid email format")
	@NotBlank(message = "email cannot be blank")
	private String email;
	@JsonProperty("list_roles")
	private List<String> listRoles;
	
}
