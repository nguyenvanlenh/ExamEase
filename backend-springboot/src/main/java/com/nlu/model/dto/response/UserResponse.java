package com.nlu.model.dto.response;

import java.util.Set;
import java.util.stream.Collectors;

import com.nlu.model.entity.Role;
import com.nlu.model.entity.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
	
	Long id;
	String code;
	String fullname;
	String emai;
	Set<String> listRoles;
	
	public UserResponse fromEntity(User user) {
		return UserResponse.builder()
				.id(user.getId())
				.code(user.getCode())
				.fullname(user.getFullname())
				.emai(user.getEmail())
				.listRoles(this.cvtListRoles(user.getListRoles()))
				.build();
	}
	
	private Set<String> cvtListRoles(Set<Role> listRoles){
		return listRoles.stream()
				.map(role -> role.getName())
				.collect(Collectors.toSet())
				;
	}

}
