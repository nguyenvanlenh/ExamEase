package com.nlu.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExamResultResponse {
    private String examName;
    private Integer totalCorrect;
    private Integer totalQuestion;
    private Integer totalWrong;
    private Long totalTime;
    private Integer totalSkipped;
}
