package com.example.demo.exception;

/**
 * Custom runtime exception thrown when a requested resource (e.g. employee) does not exist.
 * The GlobalExceptionHandler converts this into a clean HTTP 404 response.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
