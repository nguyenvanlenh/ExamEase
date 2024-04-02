package com.nlu.model.dto.request;

import java.util.List;

import com.nlu.model.entity.Question;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionRequest{
	Long id;
	String question;
	List<OptionRequest> lisOptionRequests;
	
//	public static List<Question> toEntity(){
//		
//	}
}
