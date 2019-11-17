package com.example.restapiforbeginners.example.boundary.command;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateExampleCommand {
    private Long exampleKey;
    private String exampleString;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime exampleDate;
    private Double exampleNumber;
}
