
package com.nlu.service;

import com.nlu.model.dto.request.ExamRequest;
import com.nlu.model.dto.response.ExamResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ExamService {

	ExamResponse createExam(ExamRequest request);
	ExamResponse updateExam(Long examId, ExamRequest request);
	void deleteExam(Long id);
	ExamResponse updatePublicExam(Long examId,boolean request);

	List<ExamResponse> getAllExams();
	ExamResponse getExamById(Long id);

	ResponseEntity<Map<String, Object>> getExamsByTitle(String title, Pageable pageable);
	ResponseEntity<Map<String, Object>> searchExamsByKeyWord(String keyword, Pageable pageable);
}