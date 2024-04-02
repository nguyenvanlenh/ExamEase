package com.nlu.exception;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	ResponseEntity<?> handlingMethodArgumentNotValidException(MethodArgumentNotValidException e){
		 Map<String, Object> responseBody = new LinkedHashMap<>();
	        responseBody.put("timestamp", new Date());
	         
	        List<String> errors = e.getBindingResult().getFieldErrors()
	            .stream()
	            .map(x -> x.getDefaultMessage())
	            .collect(Collectors.toList());
	         
	        responseBody.put("errors", errors);
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
		
	}
	@ExceptionHandler(NotFoundException.class)
	ResponseEntity<?> handlingNotFoundException(NotFoundException e){
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(e.getLocalizedMessage());
	}

}
