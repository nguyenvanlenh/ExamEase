package com.nlu.repository;

import com.nlu.model.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;


@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {

	UserAnswer findByStudent_IdAndOption_Id(Long student_Id, Long option_Id);
}
