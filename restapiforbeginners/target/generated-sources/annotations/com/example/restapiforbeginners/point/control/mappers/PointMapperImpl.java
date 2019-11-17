package com.example.restapiforbeginners.point.control.mappers;

import com.example.restapiforbeginners.point.boundary.command.CreateNewPointCommand;
import com.example.restapiforbeginners.point.boundary.vo.PointVO;
import com.example.restapiforbeginners.point.entity.PointEntity;
import javax.annotation.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-11-16T12:01:41+0100",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_201 (Oracle Corporation)"
)
public class PointMapperImpl implements PointMapper {

    @Override
    public PointVO mapEntity(PointEntity point) {
        if ( point == null ) {
            return null;
        }

        PointVO pointVO = new PointVO();

        pointVO.setPointKey( point.getPointKey() );
        pointVO.setLongitude( point.getLongitude() );
        pointVO.setLatitude( point.getLatitude() );

        return pointVO;
    }

    @Override
    public PointEntity mapVO(PointVO vo) {
        if ( vo == null ) {
            return null;
        }

        PointEntity pointEntity = new PointEntity();

        pointEntity.setPointKey( vo.getPointKey() );
        pointEntity.setLongitude( vo.getLongitude() );
        pointEntity.setLatitude( vo.getLatitude() );

        return pointEntity;
    }

    @Override
    public PointEntity mapCommand(CreateNewPointCommand command) {
        if ( command == null ) {
            return null;
        }

        PointEntity pointEntity = new PointEntity();

        pointEntity.setLongitude( command.getLongitude() );
        pointEntity.setLatitude( command.getLatitude() );

        return pointEntity;
    }
}
