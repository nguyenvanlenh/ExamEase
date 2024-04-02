package com.nlu.model.dto.response;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.nlu.model.entity.Exam;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ExamResponse {
	private Long id;
	private String title;
	private String shortDescription;
	private String description;
	private int quantityQuestion;
	private boolean isPublic;
	private Set<ExamNumberResponse> examNumbers;
	private String timeExam;

	public static ExamResponse fromEntity(Exam exam) {
		return ExamResponse.builder().id(exam.getId()).title(exam.getTitle())
				.shortDescription(exam.getShortDescription()).description(exam.getDescription())
				.quantityQuestion(exam.getQuantityQuestion()).isPublic(exam.isPublic())
				.examNumbers(ExamNumberResponse.fromEntities(exam.getExamNumbers()))
				.timeExam(exam.getTimeExam().getName()).build();
	}

	public static Set<ExamResponse> fromEntities(List<Exam> exams) {
		return Optional.ofNullable(exams.stream().map(ExamResponse::fromEntity)
				.collect(Collectors.toSet())).orElse(Collections.emptySet());
	}

}
