package com.nlu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nlu.model.entity.ExamNumber;
import org.springframework.data.jpa.repository.Query;

public interface ExamNumberRepository extends JpaRepository<ExamNumber, Integer> {
}
