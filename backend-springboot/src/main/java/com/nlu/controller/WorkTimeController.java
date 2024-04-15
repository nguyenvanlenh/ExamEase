package com.nlu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nlu.model.dto.response.ResponseData;
import com.nlu.model.entity.WorkTime;
import com.nlu.service.imp.WorkTimeService;

@RestController
@RequestMapping("/api/worktimes")
public class WorkTimeController {

	@Autowired
	private WorkTimeService workTimeService;

	@PostMapping("/{examId}")
	public ResponseData createWorkTime(@PathVariable(name = "examId") Long examId) {
		List<WorkTime> data = workTimeService.createWorkTime(examId);
		return ResponseData.builder()
				.status(HttpStatus.OK.value())
				.message("Create worktime from examId")
				.data(data)
				.build();
	}
}
