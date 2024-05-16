package com.nlu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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
import com.nlu.model.dto.response.ExamResponses;
import com.nlu.model.dto.response.ResponseData;
import com.nlu.service.ExamService;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

	@Autowired private ExamService examService;

	@PostMapping
	public ResponseData createExam(@RequestBody ExamRequest request) {
		System.out.println(request.getListExamNumberRequests().size());
		Long data = examService.createExam(request);
		return ResponseData.builder()
				.status(HttpStatus.CREATED.value())
				.message("Exam created successfully")
				.data(data)
				.build();
	}

	@PutMapping("/{id}")
	public ResponseData updateExam(@PathVariable Long id, @RequestBody ExamRequest request) {
		 examService.updateExam(id, request);
		 return ResponseData.builder()
				 .status(HttpStatus.OK.value())
				 .message("Exam updated successfully")
				 .build();
	}

	@PatchMapping("/{id}")
	public ResponseData updatePublicExam(@PathVariable Long id, @RequestParam Boolean isPublic) {
		 examService.updatePublicExam(id, isPublic);
		 return ResponseData.builder()
				 .status(HttpStatus.OK.value())
				 .message("Public exam updated successfully")
				 .build();
	}


	@GetMapping
	public ResponseData getExamsByCategoryAndKeyWord(
			@RequestParam(required = false) String category,
			@RequestParam(required = false) String keyword,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "3") int size) {
		Pageable paging = PageRequest.of(page, size);
		ExamResponses data = examService.getExamsByCategoryAndKeyWord(category, keyword, paging);
		 return ResponseData.builder()
				 .status(HttpStatus.OK.value())
				 .message("Exam data by category & key word")
				 .data(data)
				 .build();
	}
}