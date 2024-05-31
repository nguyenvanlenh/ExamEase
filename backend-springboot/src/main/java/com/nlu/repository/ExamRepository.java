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

//    @Query("SELECT new Exam(e.id, e.title, e.description, e.quantityQuestion, e.timeExam) " +
//            "FROM Exam e " +
//            "WHERE e.isPublic = :isPublic")
    Page<Exam> findByIsPublic(boolean isPublic, Pageable pageable);
//    @Query("SELECT new Exam(e.id, e.title, e.description, e.quantityQuestion, e.timeExam) " +
//            "FROM Exam e " +
//            "WHERE e.category.name = :category " +
//            "AND e.isPublic = :isPublic")
    Page<Exam> findByCategory_NameAndIsPublic(String category, boolean isPublic, Pageable pageable);
//    @Query("SELECT new Exam(e.id, e.title, e.description, e.quantityQuestion, e.timeExam) " +
//            "FROM Exam e " +
//            "WHERE e.title like concat('%', :keyword, '%') " +
//            "AND e.isPublic = :isPublic")
    Page<Exam> findByTitleContainingAndIsPublic(String keyword, boolean isPublic, Pageable pageable);
//    @Query("SELECT new Exam(e.id, e.title, e.description, e.quantityQuestion, e.timeExam) " +
//            "FROM Exam e " +
//            "WHERE e.title like concat('%', :keyword, '%') " +
//            "AND e.isPublic = :isPublic " +
//            "AND e.category.name = :category ")
    Page<Exam> findByCategory_NameAndTitleContainingAndIsPublic
            (String category, String keyword, boolean isPublic, Pageable pageable);
}
