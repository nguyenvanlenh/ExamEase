package com.nlu.model.dto.response;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.nlu.model.entity.ExamNumber;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ExamNumberResponse {
	private Integer id;
	private String name;
	private Set<QuestionResponse> listQuestions;

	public static ExamNumberResponse fromEntity(ExamNumber examNumber) {
		return ExamNumberResponse.builder().id(examNumber.getId()).name(examNumber.getName())
				.listQuestions(QuestionResponse.fromEntities(new HashSet<>(examNumber.getListQuestions()))).build();
	}

	public static Set<ExamNumberResponse> fromEntities(Set<ExamNumber> examNumbers) {
		return Optional.ofNullable(examNumbers).orElse(Collections.emptySet()).stream()
				.map(ExamNumberResponse::fromEntity).collect(Collectors.toSet());
	}
}
