package com.nlu.model.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Exams")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Exam implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	
	private String shortDescription;
	private String description;
	private int quantityQuestion;
	private Timestamp startTime;
	private Timestamp endTime;
	
	@OneToMany(mappedBy = "exam")
	private Set<ExamNumber> examNumbers;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="time_id")
	private TimeExam timeExam;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="teacher_id")
	private User teacher;
	

}
