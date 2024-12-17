package com.korit.moa.moa.dto.user_answer.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestUserAnswerDto {

    @NotNull
    private Long groupId;
    @NotNull
    private String userId;
    @NotNull
    private String userAnswer;

}
