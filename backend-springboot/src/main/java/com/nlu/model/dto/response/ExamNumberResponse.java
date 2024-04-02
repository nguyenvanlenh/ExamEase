package com.nlu.model.dto.response;

import com.nlu.model.entity.Option;
import com.nlu.model.entity.Question;
import com.nlu.model.entity.UserAnswer;
import lombok.*;

import java.util.Map;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExamNumberResponse {
    Long id;
    String name;
    Map<String, Set<Option>> listQuestions;
    Set<UserAnswer> userAnswers;
}
