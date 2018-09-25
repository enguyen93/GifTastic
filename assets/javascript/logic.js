let topics = ["Call of Duty MW2", "Halo 1", "Halo 2", "Halo 3", "Halo 4", "Halo 5", "Call of Duty Black Ops",
    "Breath of The Wild", "Phantasy Star Online 2", "Stardew Valley", "Fortnite", "Pokemon", "Red Dead Redemption 2"];
let $buttonArea = $(".buttonArea");

//Function that shows all the Buttons inside the array
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
//when you hit submit it appends to the end of the array and calls on renderTopics function to reload all the buttons, essentially adding the newest button
$("#add-topic").on("click", function (event) {
    event.preventDefault();
    let newTopic = $("#topic-input").val().trim();
    
//if statement here to not do anything if the submit form is empty
//possibly with an if (newTopic.length === 0){
//a line to do nothing
//}

    topics.push(newTopic);
    $("#movie-form")[0].reset();
    renderTopics();
    
})

//also make the buttons even, and the gifs, at least 2 on one line

//AJAX function that pulls from the Gif API
function displayGif() {
    let gifSearch = $(this).attr("gameName");
    let xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=o4qIILFfilZdOkG4S9V40qa4Rf9CqSMu&limit=10");
    xhr.done(function(response) { 
        console.log(response);
        //We get the below data from the above line
        
        $(".gifs-go-here").empty();
        for (i=0;i<10;i++){
        //the below line paths to the actual gif, response.data.url just leads to the gif page with the gif, which errors
        let results = response.data[i].images.fixed_height.url;
        let gifBox = $("<img>").attr("src", results);
        //these lines add the state of the picture to manipulate later
        let p = $("<p>").text("Rating: " + response.data[i].rating);
        gifBox.attr("data-still", response.data[i].images.fixed_height_still.url);
        gifBox.attr("data-animate", results);
        gifBox.attr("data-state", "still");
        gifBox.addClass("gif");
        $(".gifs-go-here").prepend(gifBox);
        $(".gifs-go-here").prepend(p);
        }
    })
}   
displayGif();
//this function is to manipulate the state of the gif
function animateGif() {
    var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    };
//these lines are to reference the clicks on the page
$(document).on("click", ".gameBtn", displayGif);
$(document).on("click", ".gif", animateGif);







