package com.nlu.model.dto.request;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import com.nlu.model.entity.Option;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OptionRequest implements Serializable{
    Long id;
    
    @NotBlank(message = "{option_content_blank}")
    String content;
    
    @NotNull(message = "{option_is_correct_null}")
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
				.toList();
		return listOptions;
	}
	
}
