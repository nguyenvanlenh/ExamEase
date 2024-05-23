package com.nlu.controller;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nlu.model.dto.response.ResponseData;
import com.nlu.model.entity.WorkTime;
import com.nlu.service.imp.WorkTimeService;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/worktimes")
public class WorkTimeController {

	@Autowired
	private WorkTimeService workTimeService;

	@PostMapping("/{examId}")
	public ResponseData createWorkTime(@PathVariable(name = "examId") Long examId) {
		boolean data = workTimeService.createWorkTime(examId);
		return ResponseData.builder()
				.status(HttpStatus.OK.value())
				.message("Create worktime from examId")
				.data(data)
				.build();
	}

	@PostMapping("/users/{userId}/exam-number/{examNumberId}")
	public ResponseData addWorkTimeById(
			@PathVariable(name = "userId") Long userId,
			@PathVariable(name = "examNumberId") Integer examNumberId,
			@RequestParam(name = "timeExam") Integer timeExam) {

		boolean data = workTimeService.addWorkTimeByUser(userId, examNumberId, timeExam);
		return ResponseData.builder()
				.status(HttpStatus.OK.value())
				.message("Add successfully")
				.data(data)
				.build();
	}

	@GetMapping("/users/{userId}/exam-number/{examNumberId}")
	public ResponseData getWorkTimeById(
			@PathVariable(name = "userId") Long userId,
			@PathVariable(name = "examNumberId") Integer examNumberId) {

		WorkTime data = workTimeService.getWorkTimeByUser(userId, examNumberId);
		return ResponseData.builder()
				.status(HttpStatus.OK.value())
				.message("Data work time by id user and id exam number")
				.data(data)
				.build();
	}

	@PutMapping("/users/{userId}/exam-number/{examNumberId}")
    public ResponseData updateWorkTimeById(
            @PathVariable(name = "userId") Long userId,
            @PathVariable(name = "examNumberId") Integer examNumberId,
            @RequestParam(name = "endExam") String endExam) {
        Timestamp endExamTimestamp;

        try {
            Instant instant = Instant.parse(endExam);
            endExamTimestamp = Timestamp.from(instant);
        } catch (Exception e) {
            return ResponseData.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("Invalid date format")
                    .data(null)
                    .build();
        }

        boolean data = workTimeService.updateEndExamWorkTimeByUser(userId, examNumberId, endExamTimestamp);
        return ResponseData.builder()
                .status(HttpStatus.OK.value())
                .message("Update successfully")
                .data(data)
                .build();
    }
	@Transactional
	@DeleteMapping("/users/{userId}/exam-number/{examNumberId}")
	public ResponseData removeWorkTimeById(
			@PathVariable(name = "userId") Long userId,
			@PathVariable(name = "examNumberId") Integer examNumberId) {
		// remove work time
		boolean data = workTimeService.removeWorkTimeByUser(userId, examNumberId);
		// remove user anwsers
		
		return ResponseData.builder()
				.status(HttpStatus.OK.value())
				.message("Data work time by id user and id exam number")
				.data(data)
				.build();
	}
}
