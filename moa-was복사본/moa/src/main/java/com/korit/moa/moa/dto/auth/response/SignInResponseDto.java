package com.korit.moa.moa.dto.auth.response;

import com.korit.moa.moa.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class SignInResponseDto {
    private Map<String, Object> user;

    private String token;

    private int exprTime;

}
