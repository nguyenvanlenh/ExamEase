package com.nlu.repository;

import com.nlu.model.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {

    UserAnswer findByUser_IdAndOption_Id(Long idUser, Long idOption);

    Optional<UserAnswer> findByStudent_IdAndOption_Id(Long idStudent, Long idOptionFirst);

}
