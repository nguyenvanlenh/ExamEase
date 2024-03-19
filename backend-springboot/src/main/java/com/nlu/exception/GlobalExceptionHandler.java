package com.nlu.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(UsernameNotFoundException.class)
	ResponseEntity<String> handlingUsernameNotFoundException(UsernameNotFoundException e){
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(e.getLocalizedMessage());
	}
	@ExceptionHandler(AuthenticationException.class)
	ResponseEntity<String> handlingAuthenticationException(AuthenticationException e){
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(e.getMessage());
	}
	@ExceptionHandler(ResourceExistedException.class)
	ResponseEntity<String> handlingResourceExistedException(ResourceExistedException e){
		return ResponseEntity.status(HttpStatus.CONFLICT)
				.body(e.getLocalizedMessage());
	}
	

}
