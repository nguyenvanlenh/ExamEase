
package com.nlu.service;

import java.util.List;

import com.nlu.model.dto.request.ExamRequest;
import com.nlu.model.dto.response.ExamResponse;

public interface ExamService {

	ExamResponse createExam(ExamRequest request);
	ExamResponse updateExam(Long examId, ExamRequest request);
	void deleteExam(Long id);
	ExamResponse updatePublicExam(Long examId,boolean request);

	List<ExamResponse> getAllExams();
	ExamResponse getExamById(Long id);
}