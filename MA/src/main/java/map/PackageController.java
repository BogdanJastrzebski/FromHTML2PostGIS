package map;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.*;

import static java.lang.Integer.parseInt;

@RestController
public class PackageController {
    private ArrayList<Package> listOfPackages = new ArrayList<Package>();

    @GetMapping("/get/{localnumber}")
    public Package get(@PathVariable int localnumber) {
        if(localnumber < listOfPackages.size()) {
            return listOfPackages.get(localnumber);
        }
        return null;
    }

    @GetMapping("/post/{number}/{name}/{size}/{lat}/{lng}")
    public void post(@PathVariable long number,
                     @PathVariable String name,
                     @PathVariable double size,
                     @PathVariable double lat,
                     @PathVariable double lng) {
        listOfPackages.add(new Package(number, name, size, lat, lng));

    }

    @GetMapping("/delete/{i}")
    public void delete(@PathVariable int i) {
        if(i <= listOfPackages.size() && i > 0) {
            listOfPackages.remove(i-1);
        }
    }
}
