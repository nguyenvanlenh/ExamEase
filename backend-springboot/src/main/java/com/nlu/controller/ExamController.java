package com.nlu.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.nlu.model.dto.request.ExamRequest;
import com.nlu.model.dto.response.ExamResponse;
import com.nlu.service.ExamService;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

	@Autowired private ExamService examService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Long createExam(@RequestBody ExamRequest request) {
		return examService.createExam(request);
	}

	@PutMapping("/{id}")
	public void updateExam(@PathVariable Long id, @RequestBody ExamRequest request) {
		 examService.updateExam(id, request);
	}

	@PatchMapping("/{id}")
	public void updatePublicExam(@PathVariable Long id, @RequestParam Boolean isPublic) {
		 examService.updatePublicExam(id, isPublic);
	}

	@GetMapping("/{id}")
	public ExamResponse getExam(@PathVariable Long id) {
		return examService.getExamById(id);
	}

	@GetMapping
	public List<ExamResponse> getExams() {
		return examService.getAllExams();
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getExamsByTitle(
			@RequestParam(required = false) String title,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "3") int size) {
		Pageable paging = PageRequest.of(page, size);
		return examService.getExamsByTitle(title, paging);
	}

	@GetMapping("/search")
	public ResponseEntity<Map<String, Object>> searchExamsByKeyWord(@RequestParam String keyword,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "3") int size) {
		Pageable paging = PageRequest.of(page, size);
		return examService.searchExamsByKeyWord(keyword, paging);
	}
}