package com.nlu.model.dto.response;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

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
	@JsonProperty("code_group")
	private String codeGroup;
	@JsonProperty("short_description")
	private String shortDescription;
	private String description;
	@JsonProperty("quantity_question")
	private int quantityQuestion;
	@JsonProperty("exam_numbers")
	private List<ExamNumberResponse> examNumbers;
	@JsonProperty("time_exam")
	private String timeExam;
	@JsonProperty("start_time")
	private Timestamp startTime;
	@JsonProperty("end_time")
	private Timestamp endTime;
	@JsonProperty("is_public")
	private boolean isPublic;

	public static ExamResponse fromEntity(Exam exam) {
		return ExamResponse.builder()
				.id(exam.getId())
				.title(exam.getTitle())
				.codeGroup(exam.getCodeGroup())
				.shortDescription(exam.getShortDescription())
				.description(exam.getDescription())
				.quantityQuestion(exam.getQuantityQuestion())
				.examNumbers(ExamNumberResponse.fromEntities(exam.getExamNumbers()))
				.timeExam(exam.getTimeExam().getName())
				.startTime(exam.getStartTime())
				.endTime(exam.getEndTime())
				.isPublic(exam.isPublic())
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
