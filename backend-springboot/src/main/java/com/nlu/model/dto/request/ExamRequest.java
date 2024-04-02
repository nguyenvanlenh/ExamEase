package com.nlu.model.dto.request;

import java.util.HashSet;
import java.util.List;

import com.nlu.model.entity.Exam;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExamRequest {
	Long teacherId;
	String title;
	String shortDescription;
	String description;
	Integer quantityQuestion;
	Integer timeId;
	Boolean isPublic;
	List<ExamNumberRequest> lisExamNumberRequests;
	List<QuestionRequest> listQuestionRequests;

	public static void toEntity(Exam exam, ExamRequest request) {
		exam.setShortDescription(request.getShortDescription());
		exam.setDescription(request.getDescription());
		exam.setTitle(request.getTitle());
		exam.setPublic(request.getIsPublic());
		exam.setExamNumbers(ExamNumberRequest.toEntities(request.getLisExamNumberRequests()));
	}
	
	
}
