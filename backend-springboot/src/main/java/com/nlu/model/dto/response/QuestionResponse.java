package com.nlu.model.dto.response;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nlu.model.entity.Question;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Builder
public class QuestionResponse {
	private Long id;
	@JsonProperty("name_question")
	private String nameQuestion;
	
	private List<OptionResponse> options;
	
	public static QuestionResponse fromEntity(Question question) {
		return QuestionResponse.builder()
				.id(question.getId())
				.nameQuestion(question.getNameQuestion())
				.options(OptionResponse.fromEntities(question.getOptions()))
				.build();
	}
	
	 public static List<QuestionResponse> fromEntities(Set<Question> questions) {
	        return Optional.ofNullable(questions)
	        		.orElse(Collections.emptySet())
	        		.stream()
	                .map(QuestionResponse::fromEntity)
	                .toList();
	    }
}
