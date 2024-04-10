package com.nlu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nlu.model.dto.request.OptionRequest;
import com.nlu.model.dto.request.QuestionRequest;
import com.nlu.model.dto.response.QuestionResponse;
import com.nlu.repository.OptionRepository;
import com.nlu.service.imp.QuestionService;


@RestController
@RequestMapping("/api/questions")
public class QuestionController {

	
	@Autowired private QuestionService questionService;

	
	@GetMapping("/exam-number")
	public List<QuestionResponse> getQuestionByExamNumberId(@RequestParam("examNumId") Integer examNumId) {
		return questionService.getQuestionByExamNumberId(examNumId);
	}
	@GetMapping("/{id}")
	public QuestionResponse getQuesitonById(@PathVariable Long id) {
		return questionService.getQuesitonById(id);
	}
	@PutMapping("/{id}")
	public void updateQuestionAndOptionRelate(@PathVariable("id") Long id,@RequestBody QuestionRequest request) {
		 questionService.updateQuestion(id,request);
	}
}
