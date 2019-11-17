(function () {
    var postPoint = function () {
        var exampleString=$('#exampleStringInput').val();
        var exampleDate=$('#exampleDateInput').val();
        var exampleNumber=parseFloat($('#exampleNumberInput').val());
        var exampleJson = JSON.stringify(
            {
                exampleString:exampleString,
                exampleDate:exampleDate,
                exampleNumber:exampleNumber
            });
        $.ajax({
            url         : "/api/v1/example", //wymagane, gdzie się łączymy, zw na hostowanie w tej samej aplikacji mozna uzyc sciezki wzglednej
            method      : "post", // metoda HTTP połączenia, domyślnie get
            contentType : 'application/json', //gdy wysyłamy dane czasami chcemy ustawić ich typ
            data        : exampleJson
        })
        //akcja na poprawna odpowiedz
        //Response z codem 200 musi zwracać body (specyficzne dla Jquery)
        .done(function(e){
            refreshContent();
        })
        //akcja na blad odpowiedz
        .fail(function(e){
            //zobaczcie jak wyglada response w consoli javascript
            //wyswietlcie poprawny komunikat bledu (czemu wystapil)
            //sprobujcie przechodzic przez atrybuty obiektu: np. e.responseJSON.errors ...
            alert("Error encountered.");
            console.log(e);
        });
    };

    var refreshContent = function () {
        console.log("Clicked Refresh");
        //inna skladnia
        $.ajax({
            url : "/api/v1/example",
            success : function(response) {
                clearContent();
                response.forEach(addExampleToContainer);
            },
            error : function() {},
            complete : function() {}
        });
    };

    var clearContent = function () {
        document.getElementById('content-container').innerHTML = "";
    };

    var addExampleToContainer = function(example){
        var singleDiv=document.createElement('div');
        var text = example.exampleString + " " + example.exampleDate + " " + example.exampleNumber;
        singleDiv.innerText = text;
        document.getElementById('content-container').appendChild(singleDiv);
    };


    //assign functions to buttons
    //refresh page on load
    window.onload = function () {
        document.getElementById('createExampleSubmit').onclick = postPoint;
        document.getElementById('refreshButton').onclick = refreshContent;
        refreshContent();
    };
})();