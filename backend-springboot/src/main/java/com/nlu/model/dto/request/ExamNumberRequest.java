package com.nlu.model.dto.request;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.nlu.model.entity.ExamNumber;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExamNumberRequest {
	Integer id;
	String name;
	
	public static ExamNumber toEntity(ExamNumberRequest request) {
		ExamNumber examNumber = new ExamNumber();
		examNumber.setId(request.getId());
		examNumber.setName(request.getName());
		return examNumber;
	}
	public static Set<ExamNumber> toEntities(List<ExamNumberRequest> request) {
		
		return Optional.ofNullable(request).orElse(Collections.emptyList())
				.stream()
				.map(ExamNumberRequest::toEntity)
				.collect(Collectors.toSet());
	}
}
