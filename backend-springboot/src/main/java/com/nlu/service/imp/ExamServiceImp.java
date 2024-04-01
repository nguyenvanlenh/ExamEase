package com.nlu.service.imp;

import com.nlu.model.dto.response.ExamResponse;
import com.nlu.model.entity.Exam;
import com.nlu.repository.ExamRepository;
import com.nlu.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class ExamServiceImp implements ExamService {
    @Autowired
    private ExamRepository examRepository;
    @Override
    public ExamResponse getExamById(Long id) {
        Optional<Exam> optionalExam = examRepository.findById(id);

        if (optionalExam.isPresent()) {
            Exam exam = optionalExam.get();
            return ExamResponse.builder()
                    .id(exam.getId())
                    .title(exam.getTitle())
                    .description(exam.getDescription())
                    .quantityQuestion(exam.getQuantityQuestion())
                    .build();
        } else {
            // Trả về null hoặc throw một ngoại lệ cụ thể
            //return null;
            throw new RuntimeException("Exam not found with id: " + id);
        }
    }
}
