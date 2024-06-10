package app.back.springtemplate.controllers.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

public record ReadComment(String message, LocalDate createdDate, LocalTime createdTime, ReadPostDto post,
    ReadUserDto user) {
}