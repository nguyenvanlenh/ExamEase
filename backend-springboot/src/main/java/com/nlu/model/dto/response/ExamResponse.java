package com.nlu.model.dto.response;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonProperty;
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
	@JsonProperty("short_description")
	private String shortDescription;
	private String description;
	@JsonProperty("quantity_question")
	private int quantityQuestion;
	@JsonProperty("is_public")
	private boolean isPublic;
	@JsonProperty("exam_numbers")
	private List<ExamNumberResponse> examNumbers;
	@JsonProperty("time_exam")
	private String timeExam;

	public static ExamResponse fromEntity(Exam exam) {
		return ExamResponse.builder()
				.id(exam.getId())
				.title(exam.getTitle())
				.shortDescription(exam.getShortDescription())
				.description(exam.getDescription())
				.quantityQuestion(exam.getQuantityQuestion())
				.isPublic(exam.isPublic())
				.examNumbers(ExamNumberResponse.fromEntities(exam.getExamNumbers()))
				.timeExam(exam.getTimeExam().getName())
				.build();
	}

	public static List<ExamResponse> fromEntities(List<Exam> exams) {
		return Optional.ofNullable(exams)
				.orElse(Collections.emptyList())
				.stream()
				.map(ExamResponse::fromEntity)
				.toList();
	}

}
