package com.nlu.controller;

import com.nlu.model.entity.ExamNumber;
import com.nlu.service.ExamNumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exam-number")
public class ExamNumberController {
    @Autowired
    private ExamNumberService examNumberService;
    @GetMapping
    public ResponseEntity<ExamNumber> getExamNumber(@RequestParam Integer id, @RequestParam Long idUser) {
        return ResponseEntity.ok(examNumberService.getExamNumberById(id, idUser).getBody());
    }
}
