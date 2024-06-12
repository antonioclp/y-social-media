package app.back.springtemplate.controllers.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

public record ReadComment(Integer commentId, String message, LocalDate createdDate, LocalTime createdTime, Integer postId,
    ReadUserDto user) {
}