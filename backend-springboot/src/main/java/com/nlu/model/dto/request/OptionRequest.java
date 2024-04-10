package com.nlu.model.dto.request;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.nlu.model.entity.Option;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OptionRequest {
	Long id;
	String content;
	Boolean isCorrect;
	
	public static Option toEntity(OptionRequest request) {
		Option option = new Option();
		option.setId(request.getId());
		option.setNameOption(request.getContent());
		option.setCorrect(request.getIsCorrect());
		return option;
	}
	
	public static List<Option> toEntities(List<OptionRequest> listOptionRequests){
		List<Option> listOptions = listOptionRequests.stream()
				.map(option -> toEntity(option))
				.collect(Collectors.toList());
		return listOptions;
	}
	
}
