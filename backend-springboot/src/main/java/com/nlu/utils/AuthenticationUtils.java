package com.nlu.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.nlu.security.CustomUserDetails;

public class AuthenticationUtils {
	public static Long extractUserId() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		return userDetails.getId();
	}
}
