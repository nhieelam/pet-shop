package com.funcoders.happy_pet_shop.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorType {

    // ===== COMMON =====
    BAD_REQUEST("Yêu cầu không hợp lệ", 400, HttpStatus.BAD_REQUEST),
    NOT_FOUND("Không tìm thấy", 404, HttpStatus.NOT_FOUND),
    UNAUTHORIZED("Chưa xác thực", 401, HttpStatus.UNAUTHORIZED),
    FORBIDDEN("Không có quyền truy cập", 403, HttpStatus.FORBIDDEN),
    INTERNAL_SERVER_ERROR("Lỗi hệ thống", 500, HttpStatus.INTERNAL_SERVER_ERROR),

    // ===== USER / AUTH =====
    USER_NOT_FOUND("Người dùng không tồn tại", 1001, HttpStatus.NOT_FOUND),
    USERNAME_ALREADY_EXISTS("Username đã tồn tại", 1002, HttpStatus.BAD_REQUEST),
    EMAIL_ALREADY_EXISTS("Email đã tồn tại", 1003, HttpStatus.BAD_REQUEST),
    ROLE_NOT_FOUND("Role không tồn tại", 1004, HttpStatus.NOT_FOUND),
    INVALID_PASSWORD("Mật khẩu không hợp lệ", 1005, HttpStatus.BAD_REQUEST),
    ACCOUNT_DISABLED("Tài khoản đã bị vô hiệu hóa", 1006, HttpStatus.FORBIDDEN),
    ACCOUNT_LOCKED("Tài khoản đã bị khóa", 1007, HttpStatus.FORBIDDEN),
    PASSWORD_MISMATCH("Mật khẩu xác nhận không khớp", 1114, HttpStatus.BAD_REQUEST),


    // ===== CATEGORY =====
    CATEGORY_NOT_FOUND("Danh mục không tồn tại", 2001, HttpStatus.NOT_FOUND),
    INVALID_CATEGORY("Thể loại không hợp lệ", 2002, HttpStatus.BAD_REQUEST),
    CATEGORY_ALREADY_EXISTS("Danh mục đã tồn tại", 2003, HttpStatus.BAD_REQUEST),

    // ===== PRODUCT =====
    PRODUCT_NOT_FOUND("Sản phẩm không tồn tại", 3001, HttpStatus.NOT_FOUND),
    PRODUCT_OUT_OF_STOCK("Sản phẩm đã hết hàng", 3002, HttpStatus.BAD_REQUEST),
    INVALID_PRODUCT_PRICE("Giá sản phẩm không hợp lệ", 3003, HttpStatus.BAD_REQUEST),
    INVALID_PRODUCT_QUANTITY("Số lượng sản phẩm không hợp lệ", 3004, HttpStatus.BAD_REQUEST),

    // ===== INVENTORY =====
    INVENTORY_NOT_FOUND("Kho hàng không tồn tại", 4001, HttpStatus.NOT_FOUND),
    INVENTORY_INACTIVE("Kho hàng không hoạt động", 4002, HttpStatus.BAD_REQUEST),
    INSUFFICIENT_INVENTORY("Không đủ hàng trong kho", 4003, HttpStatus.BAD_REQUEST),
    INVENTORY_ALREADY_EXISTS("Kho hàng đã tồn tại cho sản phẩm", 4004, HttpStatus.BAD_REQUEST),

    // ===== CART =====
    CART_NOT_FOUND("Giỏ hàng không tồn tại", 5001, HttpStatus.NOT_FOUND),
    CART_ALREADY_EXISTS("Giỏ hàng đã tồn tại", 5002, HttpStatus.BAD_REQUEST),
    CART_EMPTY("Giỏ hàng đang trống", 5003, HttpStatus.BAD_REQUEST),

    // ===== CART ITEM =====
    CART_ITEM_NOT_FOUND("Sản phẩm trong giỏ hàng không tồn tại", 5101, HttpStatus.NOT_FOUND),
    CART_ITEM_ALREADY_EXISTS("Sản phẩm đã tồn tại trong giỏ hàng", 5102, HttpStatus.BAD_REQUEST),
    INVALID_CART_ITEM_QUANTITY("Số lượng sản phẩm trong giỏ không hợp lệ", 5103, HttpStatus.BAD_REQUEST),

    // ===== INVOICE / ORDER =====
    INVOICE_NOT_FOUND("Hóa đơn không tồn tại", 6001, HttpStatus.NOT_FOUND),
    INVALID_INVOICE_STATUS("Trạng thái hóa đơn không hợp lệ", 6002, HttpStatus.BAD_REQUEST),
    INVOICE_ALREADY_PAID("Hóa đơn đã được thanh toán", 6003, HttpStatus.BAD_REQUEST),

    // ===== PURCHASE =====
    PURCHASE_NOT_FOUND("Phiếu nhập không tồn tại", 7001, HttpStatus.NOT_FOUND),
    PURCHASE_DETAIL_NOT_FOUND("Chi tiết phiếu nhập không tồn tại", 7002, HttpStatus.NOT_FOUND),
    DUPLICATE_PURCHASE_PRODUCT("Sản phẩm đã tồn tại trong phiếu nhập", 7003, HttpStatus.BAD_REQUEST);

    private final String message;
    private final int errorCode;
    private final HttpStatus httpStatus;
}

