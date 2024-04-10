package com.nlu.controller;

import com.nlu.model.dto.response.ExamResponse;
import com.nlu.model.dto.response.ExamResultResponse;
import com.nlu.service.ExamNumberService;
import org.springframework.beans.factory.annotation.Autowired;
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
    getExamResultUser(@PathVariable Long idExamNumber,
                  @RequestParam Long idUser) {
        return examNumberService.getExamResultUser(idExamNumber, idUser);
    }
    @GetMapping("/students/submit/{idExamNumber}")
    public ExamResultResponse
    getExamResultStudent(@PathVariable Long idExamNumber,
                  @RequestParam Long idStudent) {
        return examNumberService.getExamResultStudent(idExamNumber, idStudent);
    }
}
