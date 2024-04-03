package com.nlu.controller;

import com.nlu.model.dto.response.ExamNumberResponse;
import com.nlu.model.dto.response.ExamResponse;
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

    @GetMapping("/{id}")
    public ExamResponse
        getExamNumberUser(@PathVariable Integer id ,@RequestParam(required = false) Long idUser, @RequestParam(required = false) Long idStudent) {
        if(idUser != null) return examNumberService.getExamNumberUser(id, idUser);
        return null;
    }

    @GetMapping("/{idStudent}")
    public ExamResponse
    getExamNumberStudent(@PathVariable Long idStudent) {
        if(idStudent != null) return examNumberService.getExamNumberStudent(idStudent);
        return null;
    }
}
