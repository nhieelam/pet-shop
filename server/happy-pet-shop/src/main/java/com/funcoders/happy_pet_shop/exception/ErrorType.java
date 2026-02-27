package com.funcoders.happy_pet_shop.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorType {

    USER_NOT_FOUND("Người dùng không tồn tại", 1001, HttpStatus.NOT_FOUND),
    USERNAME_ALREADY_EXISTS("User đã tồn tại", 1002, HttpStatus.BAD_REQUEST),
    INVALID_CREDENTIAL("Tên đăng nhập hoặc mật khẩu không đúng", 1001, HttpStatus.UNAUTHORIZED),
    USER_DISABLED("Tài khoản đã bị vô hiệu hóa", 1002, HttpStatus.FORBIDDEN),
    BAD_REQUEST("Yêu cầu không hợp lệ", 400, HttpStatus.BAD_REQUEST),
    TOKEN_NOT_FOUND("Không tìm thấy token", 1003, HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED("Chưa xác thực", 401, HttpStatus.UNAUTHORIZED);

    private final String message;
    private final int errorCode;
    private final HttpStatus httpStatus;
}

