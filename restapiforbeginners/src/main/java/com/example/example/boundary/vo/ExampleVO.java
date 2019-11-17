package com.example.restapiforbeginners.example.boundary.vo;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExampleVO {
    private Long exampleKey;
    private String exampleString;
    private LocalDateTime exampleDate;
    private Double exampleNumber;
}
