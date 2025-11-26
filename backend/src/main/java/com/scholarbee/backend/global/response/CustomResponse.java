package com.scholarbee.backend.global.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomResponse<T> {

    private boolean isSuccess;
    private int code;
    private String message;
    private T data;

    // 요청 성공 (200 OK)
    public static <T> CustomResponse<T> ok(String message, T data) {
        return new CustomResponse<>(true, HttpStatus.OK.value(), message, data);
    }

    // 리소스 생성 (201 Created)
    public static <T> CustomResponse<T> created(String message, T data) {
        return new CustomResponse<>(true, HttpStatus.CREATED.value(), message, data);
    }

    // 데이터 없음 (204 No Content)
    public static <T> CustomResponse<T> noContent(String message) {
        return new CustomResponse<>(true, HttpStatus.NO_CONTENT.value(), message, null);
    }

    // 요청 실패 (400, 401, 403, 404, 500)
    public static <T> CustomResponse<T> fail(HttpStatus status, String message) {
        return new CustomResponse<>(false, status.value(), message, null);
    }
}
