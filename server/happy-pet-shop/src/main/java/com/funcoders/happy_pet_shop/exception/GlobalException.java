package com.funcoders.happy_pet_shop.exception;

import com.funcoders.happy_pet_shop.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalException {


    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handleMethodArgumentNotValid(
            MethodArgumentNotValidException exception
    ) {
        String message = exception
                .getBindingResult()
                .getFieldError()
                .getDefaultMessage();

        ErrorType errorType;
        try {
            errorType = ErrorType.valueOf(message);
        } catch (Exception e) {
            errorType = ErrorType.UNCATEGORIZED;
        }

        ApiResponse apiResponse = new ApiResponse(errorType);

        return ResponseEntity
                .status(errorType.getHttpStatus())
                .body(apiResponse);
    }
}
