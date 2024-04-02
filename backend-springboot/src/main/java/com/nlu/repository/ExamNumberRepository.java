package com.nlu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nlu.model.entity.ExamNumber;

public interface ExamNumberRepository extends JpaRepository<ExamNumber, Integer> {

}
