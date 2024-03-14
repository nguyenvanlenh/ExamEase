package com.nlu.model.entity;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="exam_numbers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamNumber {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="exam_id")
	private Exam exam;
	
	@ManyToMany(mappedBy = "listExamNumbers")
	private Set<Question> listQuestions;
	
	@OneToMany(mappedBy = "examNumber")
	private Set<WorkTime> listWorkTimes;
}
