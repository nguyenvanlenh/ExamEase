package com.nlu.model.dto.response;

import java.util.Collections;
import java.util.Optional;
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
	
	public static UserResponse fromEntity(User user) {
		return UserResponse.builder()
				.id(user.getId())
				.code(user.getCode())
				.fullname(user.getFullname())
				.emai(user.getEmail())
				.listRoles(cvtListRoles(user.getListRoles()))
				.build();
	}
	
	private static Set<String> cvtListRoles(Set<Role> listRoles){
        return Optional.ofNullable(listRoles).orElse(Collections.emptySet()).stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
    }

}
