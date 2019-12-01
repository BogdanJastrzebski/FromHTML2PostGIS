package com.example.restapiforbeginners.example.control.mappers;

import com.example.restapiforbeginners.example.boundary.vo.ExampleVO;
import com.example.restapiforbeginners.example.entity.ExampleEntity;
import javax.annotation.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-11-29T19:12:22+0100",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_201 (Oracle Corporation)"
)
public class ExampleMapperImpl implements ExampleMapper {

    @Override
    public ExampleVO mapEntity(ExampleEntity example) {
        if ( example == null ) {
            return null;
        }

        ExampleVO exampleVO = new ExampleVO();

        exampleVO.setExampleKey( example.getExampleKey() );
        exampleVO.setExampleString( example.getExampleString() );
        exampleVO.setExampleDate( example.getExampleDate() );
        exampleVO.setExampleNumber( example.getExampleNumber() );

        return exampleVO;
    }
}
