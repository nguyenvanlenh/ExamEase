package com.nlu.exception;

public class ResourceExistedException extends RuntimeException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ResourceExistedException(String message) {
		super(message);
	}

}
