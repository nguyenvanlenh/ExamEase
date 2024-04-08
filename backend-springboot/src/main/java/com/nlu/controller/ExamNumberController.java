package com.nlu.controller;

import com.nlu.model.dto.response.ExamNumberResponse;
import com.nlu.model.dto.response.ExamResponse;
import com.nlu.model.dto.response.ExamResultResponse;
import com.nlu.model.entity.ExamNumber;
import com.nlu.repository.ExamRepository;
import com.nlu.service.ExamNumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exam-numbers")
public class ExamNumberController {
    @Autowired
    private ExamNumberService examNumberService;

    @GetMapping("/users/{id}")
    public ExamResponse
        getExamNumberUser(@PathVariable Integer id ,@RequestParam(required = false) Long idUser) {
        return examNumberService.getExamNumberUser(id, idUser);
    }

    @GetMapping("/students/{idStudent}")
    public ExamResponse
    getExamNumberStudent(@PathVariable Long idStudent) {
        return examNumberService.getExamNumberStudent(idStudent);
    }

    @GetMapping("/users/submit/{idExamNumber}")
    public ExamResultResponse
    getExamResult(@PathVariable Long idExamNumber,
                  @RequestParam Long idUser,
                  @RequestParam(required = false) Long totalTime) {
        return examNumberService.getExamResult(idExamNumber, idUser, totalTime);
    }
}
