package com.nlu.service;

import java.util.Set;

import com.nlu.model.dto.request.ExamRequest;
import com.nlu.model.dto.response.ExamResponse;

public interface ExamService {

	ExamResponse createExam(ExamRequest request);
	ExamResponse updateExam(Long examId, ExamRequest request);
	void deleteExam(Long id);
	ExamResponse updatePublicExam(Long examId,boolean request);
	
	Set<ExamResponse> getAllExams();
	ExamResponse getExamById(Long id);
	
	
}
