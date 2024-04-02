package com.nlu.service;

import com.nlu.model.dto.response.ExamResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface ExamService {
    public ResponseEntity<ExamResponse> getExamById(Long id);
}
