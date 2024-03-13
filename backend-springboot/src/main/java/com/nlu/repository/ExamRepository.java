package com.nlu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nlu.model.entity.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long>{
	
	

}
