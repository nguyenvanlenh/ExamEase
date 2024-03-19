package com.nlu.model.response;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AuthenticationResponse {

	private String token;
	private boolean authenticated;
	private String error;
	@JsonProperty("list_roles")
	private Set<String> listRoles;
}
