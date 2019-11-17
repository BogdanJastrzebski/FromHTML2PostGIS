package com.example.restapiforbeginners.example.boundary.command;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Max;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FetchExamplesCommand {
    //initial value
    protected Integer page = 0;
    @Max(500)
    protected Integer perPage = 50;
}
