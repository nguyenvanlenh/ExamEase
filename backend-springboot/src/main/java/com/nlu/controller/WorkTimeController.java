package com.nlu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nlu.service.imp.WorkTimeService;

@RestController
@RequestMapping("/api/worktimes")
public class WorkTimeController {

	@Autowired private WorkTimeService workTimeService;
	
	@PostMapping("/{examId}")
	public void createWorkTime(@PathVariable(name = "examId") Long examId) {
		workTimeService.createWorkTime(examId);
	}
}
