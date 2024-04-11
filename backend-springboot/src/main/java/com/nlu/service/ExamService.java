
package com.nlu.service;

import com.nlu.model.dto.request.ExamRequest;
import com.nlu.model.dto.response.ExamResponse;
import com.nlu.model.dto.response.ExamResponses;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ExamService {

	Long createExam(ExamRequest request);
	void updateExam(Long examId, ExamRequest request);
	void deleteExam(Long id);
	void updatePublicExam(Long examId,boolean request);

	List<ExamResponse> getAllExams();
	ExamResponse getExamById(Long id);

	ExamResponses
		getExamsByCategoryAndKeyWord(String category, String keyword, Pageable pageable);

}