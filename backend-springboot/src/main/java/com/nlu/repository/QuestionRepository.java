package com.nlu.repository;

import com.nlu.model.entity.Option;
import com.nlu.model.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nlu.model.entity.Question;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

}
