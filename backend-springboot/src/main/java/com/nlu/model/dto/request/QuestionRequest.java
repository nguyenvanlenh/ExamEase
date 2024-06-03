package com.nlu.model.dto.request;

import java.io.Serializable;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionRequest implements Serializable{
	Long id;

	@NotBlank(message = "{question_text_blank}")
	String question;

	@NotNull(message = "{question_options_null}")
	@Size(min = 1, message = "{question_options_size}")
	List<@Valid OptionRequest> listOptionRequests;

}
