package app.back.springtemplate.controllers.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

public record ReadPostDto(Integer postId, String message, LocalDate createdDate, LocalTime createdTime, ReadUserDto user) {
}
