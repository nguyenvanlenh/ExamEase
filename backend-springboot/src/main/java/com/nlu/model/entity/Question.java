package com.nlu.model.entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="questions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Question {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "name_question")
	private String nameQuestion;
	
	@OneToMany(mappedBy = "question")
	private Set<Option> options;
	
	@ManyToMany
	@JoinTable(
			name = "examnumber_ques",
			joinColumns = @JoinColumn(name ="question_id"),
			inverseJoinColumns = @JoinColumn(name="examnumber_id"))
	private Set<ExamNumber> listExamNumbers;
}
