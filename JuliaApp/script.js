
$(function() {
  $('#submitbtn').on('click', function() {

    const data = {
      name: $('#name').val(),
      surname: $('#surname').val(),
      height: $('#height').val()
    }

    fetch("/people/1",{
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

  })

  const data = {
    name: "Maja",
    surname: "Kowalska",
    height: 175
  }

  console.log(JSON.stringify(data))

  const resp = fetch("http://localhost:8001/people",{
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())

  console.log(data)
  resp.then(_=> console.log(this))

  $.ajax({
    url:"http://localhost:8001/people",
    method:"post",
    contentType:"application/json",
    data:JSON.stringify(data)
  })
  .done(e => refreshContent())
  .fail(e => {
    alert("error");
    console.log(e);
  })


})

console.log("asdf")
