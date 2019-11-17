package com.example.restapiforbeginners.endpoint;

import com.example.restapiforbeginners.example.boundary.ExampleService;
import com.example.restapiforbeginners.example.boundary.command.CreateNewExampleCommand;
import com.example.restapiforbeginners.example.boundary.command.FetchExamplesCommand;
import com.example.restapiforbeginners.example.boundary.command.UpdateExampleCommand;
import com.example.restapiforbeginners.example.boundary.vo.ExampleVO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/example")
public class ExampleController {

    private final ExampleService exampleService;

    /*
     * Returns array of all entities of given resource
     * URL has to uniquely identify function in Controller
     * That function would conflict with getExamplesPaginated
     */
    @GetMapping()
     public List<ExampleVO> getExamples(){
        return exampleService.getAllExamples();
    }


    /*
     * Returns page of all entities of given resource
     * To avoid too long request
     *
    @GetMapping()
    public Page<ExampleVO> getExamplesPaginated(FetchExamplesCommand command){
        return exampleService.getExamplesPaginated(command);
    }
    */

    /*
     * Creates new instance of entity
     * Please notice that Command does not get ID, as it have to be new entity.
     * It prohibits conflict with already existing instance.
     * */
    @PostMapping()
    public ResponseEntity createNewExample(@Valid @RequestBody CreateNewExampleCommand command){
        try{
            exampleService.createExample(command);
        }catch(ResponseStatusException e){
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /*
     * Updates all attributes
     * Replaces missing values by null
     * */
    @PutMapping()
    public ResponseEntity updateExampleAllAttributes(@Valid @RequestBody UpdateExampleCommand command){
        try{
            exampleService.updateExampleAllAttributes(command);
        }catch(ResponseStatusException e){
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


    /*
     * Updates all attributes
     * Replaces missing values by null
     * */
    @PutMapping("/{exampleKey}")
    public ResponseEntity updateExampleAllAttributes(@PathVariable("exampleKey") Long exampleKey, @Valid @RequestBody UpdateExampleCommand command){
        command.setExampleKey(exampleKey);
        return updateExampleAllAttributes(command);
    }

    /*
     * Updates selected attributes
     * Do not modify attributes if are passed as null/not passed at all
     * */
    @PatchMapping()
    public ResponseEntity updateExampleSelectedAttributes(@Valid @RequestBody UpdateExampleCommand command){
        try{
            exampleService.updateExampleSelectedAttributes(command);
        }catch(ResponseStatusException e){
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    /*
     * Updates selected attributes
     * Do not modify attributes if are passed as null/not passed at all
     * */
    @PatchMapping("/{exampleKey}")
    public ResponseEntity updateExampleSelectedAttributes(@PathVariable("exampleKey") Long exampleKey, @Valid @RequestBody UpdateExampleCommand command){
        command.setExampleKey(exampleKey);
        return updateExampleSelectedAttributes(command);
    }

    @DeleteMapping("/{exampleKey}")
    public ResponseEntity deleteExample(@PathVariable("exampleKey") Long exampleKey){
        try{
            exampleService.deleteExample(exampleKey);
        }catch(ResponseStatusException e){
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
