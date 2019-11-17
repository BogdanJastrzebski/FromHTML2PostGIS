package com.example.restapiforbeginners.map.control.mappers;

import com.example.restapiforbeginners.map.boundary.vo.MapVO;
import com.example.restapiforbeginners.map.entity.MapEntity;
import com.example.restapiforbeginners.point.boundary.vo.PointVO;
import com.example.restapiforbeginners.point.entity.PointEntity;
import java.util.HashSet;
import java.util.Set;
import javax.annotation.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-11-16T12:01:41+0100",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_201 (Oracle Corporation)"
)
public class MapMapperImpl implements MapMapper {

    @Override
    public MapVO mapEntity(MapEntity map) {
        if ( map == null ) {
            return null;
        }

        MapVO mapVO = new MapVO();

        mapVO.setMapKey( map.getMapKey() );
        mapVO.setMapName( map.getMapName() );
        mapVO.setPoints( pointEntitySetToPointVOSet( map.getPoints() ) );

        return mapVO;
    }

    @Override
    public MapVO mapEntityIgnorePoints(MapEntity map) {
        if ( map == null ) {
            return null;
        }

        MapVO mapVO = new MapVO();

        mapVO.setMapKey( map.getMapKey() );
        mapVO.setMapName( map.getMapName() );

        return mapVO;
    }

    protected PointVO pointEntityToPointVO(PointEntity pointEntity) {
        if ( pointEntity == null ) {
            return null;
        }

        PointVO pointVO = new PointVO();

        pointVO.setPointKey( pointEntity.getPointKey() );
        pointVO.setLongitude( pointEntity.getLongitude() );
        pointVO.setLatitude( pointEntity.getLatitude() );

        return pointVO;
    }

    protected Set<PointVO> pointEntitySetToPointVOSet(Set<PointEntity> set) {
        if ( set == null ) {
            return null;
        }

        Set<PointVO> set1 = new HashSet<PointVO>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( PointEntity pointEntity : set ) {
            set1.add( pointEntityToPointVO( pointEntity ) );
        }

        return set1;
    }
}
