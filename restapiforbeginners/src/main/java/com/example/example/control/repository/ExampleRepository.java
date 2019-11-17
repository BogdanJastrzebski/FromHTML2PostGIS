package com.example.restapiforbeginners.example.control.repository;

import com.example.restapiforbeginners.example.entity.ExampleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/*extends JpaRepository<RelatedEntity, Class of RelatedEntity Id>*/
@Repository
public interface ExampleRepository extends JpaRepository<ExampleEntity, Long> {

    Page<ExampleEntity> findAll(Pageable pageable);

    Optional<ExampleEntity> findById(Long id);

    List<ExampleEntity> findByExampleString(String value);

    List<ExampleEntity> findByExampleStringStartsWith(String substring);

    List<ExampleEntity> findByExampleStringAndExampleNumber(String string, Double number);

    List<ExampleEntity> findByExampleStringOrExampleNumber(String string, Double number);
}
