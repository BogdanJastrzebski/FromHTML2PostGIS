using Genie, Genie.Router, Genie.Requests, Genie.Renderer
using DataFrames
using JSON: json

people = DataFrame(name=["asdf", "asdsa"],
                   surname=["asf" , "as"],
                   height=[3.3, 3.2])

route("/people") do
    return json(people)
end

route("/people", method=POST) do
    @show postpayload(:name, "")
    @show jsonpayload()
    name = postpayload(:name, "")
    surname = postpayload(:surname, "")
    height = parse(Float64, postpayload(:height, ""))
    push!(people, (name, surname, height))
    return "Added"
end

route("/people/:id") do
    i = parse(Int64, payload(:id))
    return (name = people[i, :name],
            surname = people[i, :surname],
            height = people[i, :height]) |> json
end

route("/people/:id", method = PUT) do
    @show postpayload()
    i = parse(Int64, payload(:id))

    name = postpayload(:name, "")
    surname = postpayload(:surname, "")
    height = parse(Float64, postpayload(:height, ""))

    people[i, :name] = name
    people[i, :surname] = surname
    people[i, :height] = height

    return nothing
end

up(8001, async=false)
