package com.nlu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nlu.model.entity.Exam;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long>{
    Exam findByExamNumbers_Id(Integer id);

    Exam findByCodeGroup(String codeGroup);

    @Query("SELECT new Exam(e.title, e.description, e.quantityQuestion, e.timeExam) " +
            "FROM Exam e " +
            "WHERE e.isPublic = :isPublic")
    Page<Exam> findByIsPublic(boolean isPublic, Pageable pageable);
    @Query("SELECT new Exam(e.title, e.description, e.quantityQuestion, e.timeExam) " +
            "FROM Exam e " +
            "WHERE e.title = :title " +
            "AND e.isPublic = :isPublic")
    Page<Exam> findByTitleContainingIgnoreCaseAndIsPublic(String title, boolean isPublic, Pageable pageable);
}
