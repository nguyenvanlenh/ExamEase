
package com.nlu.service;

import java.util.List;

import com.nlu.model.dto.request.ExamRequest;
import com.nlu.model.dto.response.ExamResponse;

public interface ExamService {

	Long createExam(ExamRequest request);
	Long updateExam(Long examId, ExamRequest request);
	void deleteExam(Long id);
	Long updatePublicExam(Long examId,boolean request);

	List<ExamResponse> getAllExams();
	ExamResponse getExamById(Long id);
}