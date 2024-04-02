package com.nlu.exception;

public class ResourceNotExistException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public ResourceNotExistException(String message) {
        super(message);
    }
}
