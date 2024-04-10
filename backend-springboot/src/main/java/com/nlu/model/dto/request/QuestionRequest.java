package com.nlu.model.dto.request;

import java.util.List;

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
	List<OptionRequest> listOptionRequests;
	
}
