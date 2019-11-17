package com.example.restapiforbeginners.example.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "EXAMPLE")
public class ExampleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exampleKey;
    private String exampleString;
    private LocalDateTime exampleDate;
    private Double exampleNumber;
}
