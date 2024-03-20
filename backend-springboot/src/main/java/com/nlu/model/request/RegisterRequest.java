package com.nlu.model.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterRequest {

	private String username;
	private String password;
	private String email;
	@JsonProperty("list_roles")
	private List<String> listRoles;
	
}
