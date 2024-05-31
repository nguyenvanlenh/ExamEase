package com.nlu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nlu.model.entity.Question;
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
	List<Question> findByListExamNumbers_Id(Integer examNumberId);

}
