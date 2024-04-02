package com.nlu.controller;

import com.nlu.model.dto.response.ExamResponse;
import com.nlu.model.entity.Exam;
import com.nlu.repository.ExamRepository;
import com.nlu.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/exams")
public class ExamController {
    @Autowired
    private ExamService examService;
    @GetMapping()
    public ResponseEntity<ExamResponse> getExamId(@RequestParam Long id){
        return examService.getExamById(id);
    }
}
