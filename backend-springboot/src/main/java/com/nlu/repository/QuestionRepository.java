package com.nlu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nlu.model.entity.Question;
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

	
	@Query(nativeQuery = true, value = "SELECT * FROM examnumber_ques AS EQ"
			+ " INNER JOIN questions AS Q ON EQ")
	List<Question> findByExamNumberId(Integer examNumberId);

}
