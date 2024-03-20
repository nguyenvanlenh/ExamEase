package com.nlu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nlu.model.entity.Question;

public interface QuestionRepositoty extends JpaRepository<Question, Long> {

}
