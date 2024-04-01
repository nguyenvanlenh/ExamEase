package com.nlu.repository;

import com.nlu.model.dto.response.ExamResponse;
import com.nlu.model.entity.ExamNumber;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nlu.model.entity.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long>{

}
