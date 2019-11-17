using Genie, Genie.Router, Genie.Renderer, Genie.Requests

route("/hello.html") do
    html("<center> Hello Wolrd! <center>")
end

up(8001, async=false)
