package com.funcoders.happy_pet_shop.exception;

import com.funcoders.happy_pet_shop.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Locale;
import java.util.Optional;

@Slf4j
@ControllerAdvice
public class GlobalException {
    @ExceptionHandler(AppException.class)
    ResponseEntity<ApiResponse> appExceptionHandler(AppException appException) {
        ErrorType errorType = appException.getErrorType();

        ApiResponse apiResponse = new ApiResponse(errorType);

        return ResponseEntity.status(errorType.getHttpStatus()).body(apiResponse);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    ResponseEntity<ApiResponse> dataIntegrityViolationHandler(
            DataIntegrityViolationException exception
    ) {
        log.error("Data integrity violation", exception);

        ErrorType errorType = resolveDataIntegrityError(exception);

        ApiResponse apiResponse = new ApiResponse(errorType);

        return ResponseEntity
                .status(errorType.getHttpStatus())
                .body(apiResponse);
    }

    /**
     * Spring maps every DB constraint failure to {@link DataIntegrityViolationException}.
     * The handler used to always return {@link ErrorType#USERNAME_ALREADY_EXISTS}, which
     * misleads users when the real cause is e.g. value too long for a column or duplicate phone.
     */
    private static ErrorType resolveDataIntegrityError(DataIntegrityViolationException exception) {
        String msg = Optional.ofNullable(exception.getMostSpecificCause())
                .map(Throwable::getMessage)
                .orElse("")
                .toLowerCase(Locale.ROOT);

        if (msg.contains("too long") || msg.contains("value too long")) {
            return ErrorType.BAD_REQUEST;
        }
        if (msg.contains("email")) {
            return ErrorType.EMAIL_ALREADY_EXISTS;
        }
        if (msg.contains("phone")) {
            return ErrorType.PHONE_ALREADY_EXISTS;
        }
        if (msg.contains("username")) {
            return ErrorType.USERNAME_ALREADY_EXISTS;
        }
        return ErrorType.BAD_REQUEST;
    }

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
