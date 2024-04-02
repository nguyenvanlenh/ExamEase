package com.nlu.service;

import com.nlu.model.entity.ExamNumber;
import org.springframework.http.ResponseEntity;

public interface ExamNumberService {
    public ResponseEntity<ExamNumber> getExamNumberById(Integer id, Long idUser);
}
