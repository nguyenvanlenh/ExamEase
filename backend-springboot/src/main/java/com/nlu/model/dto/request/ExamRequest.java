package com.nlu.model.dto.request;

import java.sql.Timestamp;
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
	Timestamp startTime;
	Timestamp endTime;
	Boolean isPublic;
	List<ExamNumberRequest> lisExamNumberRequests;
	List<QuestionRequest> listQuestionRequests;

	public static void setForEntity(Exam exam, ExamRequest request) {
		exam.setShortDescription(request.getShortDescription());
		exam.setDescription(request.getDescription());
		exam.setTitle(request.getTitle());
		exam.setPublic(request.getIsPublic());
		exam.setQuantityQuestion(request.getQuantityQuestion());
		exam.setStartTime(request.getStartTime());
		exam.setEndTime(request.getEndTime());
		exam.setExamNumbers(ExamNumberRequest.toEntities(request.getLisExamNumberRequests()));
	}
	
	
}
