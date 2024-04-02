package com.nlu.model.dto.response;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.nlu.model.entity.Option;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OptionResponse {
	private Long id;
	private String nameOption;

	public static OptionResponse fromEntity(Option option) {
		return OptionResponse.builder().id(option.getId()).nameOption(option.getNameOption()).build();
	}

	public static Set<OptionResponse> fromEntities(Set<Option> options) {
		return Optional.ofNullable(options).orElse(Collections.emptySet()).stream().map(OptionResponse::fromEntity)
				.collect(Collectors.toSet());
	}
}
