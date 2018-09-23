let topics = ["Call of Duty MW2", "Halo 1", "Halo 2", "Halo 3", "Halo 4", "Halo 5", "Call of Duty Black Ops",
    "Breath of The Wild", "Phantasy Star Online 2", "Stardew Valley", "Fortnite", "Pokemon", "Red Dead Redemption 2"];
let $buttonArea = $(".buttonArea");

function renderTopics() {
    $buttonArea.empty();
    for (i = 0; i < topics.length; i++) {
        let button = $("<button>");
        button.text(topics[i]);
        button.addClass("gameBtn");
        button.attr("gameName", topics[i]);
        $buttonArea.append(button);

    }
}
renderTopics();
$(this).on("click", function () {
    console.log();
})

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    let newTopic = $("#topic-input").val().trim();
    topics.push(newTopic);
    $("#movie-form")[0].reset();
    renderTopics();
})

function displayGif(response) {
    let gifSearch = $(this).attr("gameName");
    let xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=o4qIILFfilZdOkG4S9V40qa4Rf9CqSMu&limit=10");
    xhr.done(function(response) { console.log("success got data", response); });

    for (i=0; i<10; i++) {
        //something wrong with the line below, 'data' is undefined
    let gifURL = response.data[i].url;
    let gifHolder = $("<img>").attr("src", gifURL);
    $("#gifs-go-here").append(gifHolder);

        
        
    }

}    
displayGif();
$(document).on("click", ".gameBtn", displayGif);

