package com.nlu.model.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamResponse {
    Long id;
    String title;
    String description;
    int quantityQuestion;


}
