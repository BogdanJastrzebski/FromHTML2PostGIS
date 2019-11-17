package com.example.restapiforbeginners.example.control.mappers;

import com.example.restapiforbeginners.example.boundary.vo.ExampleVO;
import com.example.restapiforbeginners.example.entity.ExampleEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ExampleMapper {

    ExampleMapper INSTANCE = Mappers.getMapper(ExampleMapper.class);

    ExampleVO mapEntity(ExampleEntity example);
}
