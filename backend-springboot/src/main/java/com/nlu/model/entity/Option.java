package com.nlu.model.entity;

import java.util.Set;

import jakarta.persistence.Column;
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
@Table(name ="options")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Option {

	@Id
	private Long id;
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="name_option")
	private String nameOption;
	
	private Boolean correct;
	
	@ManyToOne
	@JoinColumn(name="question_id")
	private Question question;
	
	@OneToMany(mappedBy = "option")
	private Set<UserAnswer> listUserAnswers;
	
}
