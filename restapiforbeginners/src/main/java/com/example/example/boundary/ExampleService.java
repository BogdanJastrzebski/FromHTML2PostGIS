package com.example.restapiforbeginners.example.boundary;

import com.example.restapiforbeginners.example.boundary.command.CreateNewExampleCommand;
import com.example.restapiforbeginners.example.boundary.command.FetchExamplesCommand;
import com.example.restapiforbeginners.example.boundary.command.UpdateExampleCommand;
import com.example.restapiforbeginners.example.boundary.vo.ExampleVO;
import com.example.restapiforbeginners.example.control.mappers.ExampleMapper;
import com.example.restapiforbeginners.example.control.repository.ExampleRepository;
import com.example.restapiforbeginners.example.entity.ExampleEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExampleService {

    @PersistenceContext
    private EntityManager entityManager;
    private final ExampleRepository exampleRepository;

    public List<ExampleVO> getAllExamples(){
        return exampleRepository.findAll()
                .stream()
                .map(e->ExampleMapper.INSTANCE.mapEntity(e))
                .collect(Collectors.toList());
    }

    public Page<ExampleVO> getExamplesPaginated(FetchExamplesCommand command){
        //it is possible to create complicated rules of sorting
        Sort sort = Sort.by(Sort.Direction.ASC, "exampleKey");
        Pageable pageable = PageRequest.of(command.getPage(), command.getPerPage(), sort);
        Page<ExampleEntity> page = exampleRepository.findAll(pageable);
        return page.map(ExampleMapper.INSTANCE::mapEntity);
    }

    @Transactional
    public void createExample(CreateNewExampleCommand command){
        ExampleEntity exampleEntity = ExampleEntity.builder()
                .exampleNumber(command.getExampleNumber())
                .exampleDate(command.getExampleDate())
                .exampleString(command.getExampleString())
                .build();
        entityManager.persist(exampleEntity);
    }

    /*Optional classes are used to handle possibility of null returned from function*/
    @Transactional
    public void updateExampleAllAttributes(UpdateExampleCommand command){
        //Return BAD REQUEST when update command do not have key
        Long id = Optional.ofNullable(command.getExampleKey()).orElseThrow(()->new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not passed id to update"));
        ExampleEntity exampleEntity = findEntityById(id);
        exampleEntity.setExampleDate(command.getExampleDate());
        exampleEntity.setExampleNumber(command.getExampleNumber());
        exampleEntity.setExampleString(command.getExampleString());
        entityManager.persist(exampleEntity);
    }

    @Transactional
    public void updateExampleSelectedAttributes(UpdateExampleCommand command){
        // Return BAD REQUEST when update command do not have key
        Long id = Optional.ofNullable(command.getExampleKey()).orElseThrow(()->new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not passed id to update"));
        ExampleEntity exampleEntity = findEntityById(id);
        // can be replaced by one-liner
        // exampleEntity.setExampleDate(Optional.ofNullable(command.getExampleDate()).orElse(exampleEntity.getExampleDate()))
        if(command.getExampleDate()!=null) {
            exampleEntity.setExampleDate(command.getExampleDate());
        }
        if(command.getExampleString()!=null) {
            exampleEntity.setExampleString(command.getExampleString());
        }
        if(command.getExampleNumber()!=null) {
            exampleEntity.setExampleNumber(command.getExampleNumber());
        }
        entityManager.persist(exampleEntity);
    }

    @Transactional
    public void deleteExample(Long id){
        ExampleEntity exampleEntity = findEntityById(id);
        entityManager.remove(exampleEntity);
    }

    private ExampleEntity findEntityById(Long id){
        Optional<ExampleEntity> optionalExampleEntity = exampleRepository.findById(id);
        if(!optionalExampleEntity.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Example with id " + id + " not found.");
        }
        return optionalExampleEntity.get();
    }

}
