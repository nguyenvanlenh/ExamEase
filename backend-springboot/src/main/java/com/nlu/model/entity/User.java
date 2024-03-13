package com.nlu.model.entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name ="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Id
	private Long id;
	@Column(nullable = false,length = 8)
	private String code;
	@Column(nullable = false,length = 20)
	private String username;
	@Column(nullable = false)
	private String password;
	private String fullname;
	private String email;
	private Boolean active;
	
	@OneToMany(mappedBy = "teacher")
	private Set<Student> listStudents;
	
	@OneToMany(mappedBy = "teacher")
	private Set<Exam> listExams;
	
	
	

}
