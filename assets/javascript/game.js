//Declare variables of word bank, images to match, and hangman images

var movies = [
    { 
        name: "The Good The Bad and The Ugly",
        sound: "",
        poster: "assets/images/TheGoodTheBadTheUgly.jpg"
    }, {
        name: "A Fistful of Dollars",
        sound: "assets/sounds/AFistfulofDollars.mp3",
        poster: "assets/images/AFistfulofDollars.jpg"
     }, {
        name: "The Mercenary",
        sound: "assets/sounds/TheMercenary.mp3",
        poster: "assets/images/TheMercenary.jpg"
     }, {
        name: "Once Upon A Time in the West",
        sound: "assets/sounds/OnceUponATimeInTheWest.mp3",
        poster: "assets/images/OnceUponATimeInTheWest.jpg"
     }, {
        name: "Day of Anger",
        sound: "assets/sounds/DayofAnger.mp3",
        poster: "assets/images/DayOfAnger.jpg"
     }, {
        name: "Death Rides a Horse",
        sound: "assets/sounds/DeathRidesAHorse.mp3",
        poster: "assets/images/DeathRidesAHorse.jpg"
     }, {
        name: "The Magnificent Seven",
        sound: "assets/sounds/TheMagnificentSeven.mp3",
        poster: "assets/images/TheMagnificentSeven.jpg"
     }, {
        name: "For a Few Dollars More",
        sound: "assets/sounds/ForAFewDollarsMore.mp3",
        poster: "assets/images/ForAFewDollarsMore.jpg"
     }, {
        name: "The Great Silence",
        sound: "assets/sounds/TheGreatSilence.mp3",
        poster: "assets/images/TheGreatSilence.jpg"
     }, {
        name: "The Big Gundown",
        sound: "assets/sounds/TheBigGundown.mp3",
        poster: "assets/images/TheBigGundown.jpg"
     }, 
    //  {
    //     name: "Companeros",
    //     sound: "assets/sounds/AFistfulofDollars.mp3",
    //     poster: "assets/images/Companeros.jpg"
    //  }, 
     {
        name: "Duck You Sucker",
        sound: "assets/sounds/DuckYouSucker.mp3",
        poster: "assets/images/DuckYouSucker.jpg"
     }
    //  , {
    //     name: "A Bullet for the General",
    //     sound: "assets/sounds/AFistfulofDollars.mp3",
    //     poster: "assets/images/AFistfulofDollars.jpg"
    //  }, {
    //     name: "Cemetary Without Crosses",
    //     sound: "assets/sounds/AFistfulofDollars.mp3",
    //     poster: "assets/images/CemetaryWithoutCrosses.jpg"
    //  }
    ];

var lettersGuessed = $("#letters-guessed");
var guessWord = document.querySelector("#guess-word");
var hangmanDiv = document.querySelector("#hangman-container");
var displayCompPick = document.querySelector("#display-word");
var guessesRemaining  = document.querySelector("#guesses-remaining");
var lettersDiv = $("#letters");
var movieClip = document.querySelector("#movie-clip");
var winsDiv = document.querySelector("#wins");
var wins = 0;
var guesses = 10;
var gameOverSound = document.querySelector("#game-over-sound");
var userGuesses = [];
var guessedLetters = document.getElementsByClassName("letter");


var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//Create grid of letters
for ( var i = 0; i < letters.length; i++) {
    var letterSquare = document.createElement("DIV");
    letterSquare.className = "unguessed-letter letter"
    letterSquare.setAttribute("id","letter" + letters[i]);
    letterSquare.innerHTML = letters[i];
    lettersDiv.append(letterSquare);

}

winsDiv.innerHTML = wins;
guessesRemaining.innerHTML = guesses;




//Start Game
document.getElementById("start").onclick = function(newGame) {

    //Reset Guesses
    var guesses = 10;
    guessesRemaining.innerHTML = guesses;

    //Clear User Guesses
    var userGuesses = [];

    //Clear Guessed Letter styles
    var guessedLetters = document.getElementsByClassName("letter");

    for ( var i = 0; i < guessedLetters.length; i++) {
        guessedLetters[i].className = "unguessed-letter letter";
    }

    //Empty Hangman, Blanks, and Sound
    guessWord.innerHTML = "";
    hangmanDiv.innerHTML = "";
    movieClip.setAttribute("src", "");
    displayCompPick.innerHTML = "";

    //Create new hangman image
    newHangmanImage = document.createElement("IMG");
    newHangmanImage.setAttribute("id", "hangman");
    hangmanDiv.append(newHangmanImage);

    var hangmanImage = document.querySelector("#hangman");




    //Randomly choose word and convert to blanks

    var newMovie = movies[Math.floor(Math.random() * movies.length)];
    var newWord = newMovie.name.toUpperCase();
    var blanks = newWord.length;
    var displayWord = newWord.toUpperCase();



    movieClip.setAttribute("src", newMovie.sound )

    for ( i = 0; i < displayWord.length; i++ ) {
    var blankLetter = displayWord.charAt(i);
    var blank = document.createElement("DIV");
    blank.className = "blank " + blankLetter;
    guessWord.append(blank);

    if ( blankLetter === " " ) {
            blank.className = "blank-space " + blankLetter;
        } 
    } 

    var lettersInWord = blanks - document.getElementsByClassName("blank-space").length;

    var lettersGuessedInWord = 0;

    //Take user input and replace blanks with letters or add letters to "Letters Guessed" and change hangman image/counter

    document.onkeyup = function(e){
        var guessKey = e.key;
        var displayGuessKey = guessKey.toUpperCase();
        
        //User guesses letter, will not run if special character
        if (userGuesses.indexOf(displayGuessKey) < 0 && guesses > 0 && lettersInWord !== lettersGuessedInWord) {

            userGuesses.push(displayGuessKey);
            console.log(userGuesses);
            
            //New letter is guessed
            if (letters.indexOf(displayGuessKey) > - 1) {
                
                //Determine if letter is movie title
                if ( newWord.includes(displayGuessKey) ) {

                    //Puts letter in blanks
                    var changeBlank = document.getElementsByClassName(displayGuessKey);
            
                    for ( var i = 0; i < changeBlank.length; i++) {
                        changeBlank[i].innerHTML = displayGuessKey;
                    }

                    //Change Guessed Letter to Green
                    document.getElementById("letter" + displayGuessKey).className = "guessed-letter-correct letter";

                    //Increase No. of letters Guessed in Word
                    lettersGuessedInWord += changeBlank.length;
                    

                } else {
                    //Change guessed letter to red
                    document.getElementById("letter" + displayGuessKey).className = "guessed-letter-wrong letter";

                    guesses -= 1

                    guessesRemaining.innerHTML = guesses;

                    if (guesses === 9) {
                        hangmanImage.setAttribute("src", "assets/images/gallows1.png");
                    } else if (guesses === 8) {
                        hangmanImage.setAttribute("src", "assets/images/gallows2.png");
                    } else if (guesses === 7) {
                        hangmanImage.setAttribute("src", "assets/images/gallows3.png");
                    } else if (guesses === 6) {
                        hangmanImage.setAttribute("src", "assets/images/gallows4.png");
                    } else if (guesses === 5) {
                        hangmanImage.setAttribute("src", "assets/images/gallows5.png");
                    } else if (guesses === 4) {
                        hangmanImage.setAttribute("src", "assets/images/gallows6.png");
                    } else if (guesses === 3) {
                        hangmanImage.setAttribute("src", "assets/images/gallows7.png");
                    } else if (guesses === 2) {
                        hangmanImage.setAttribute("src", "assets/images/gallows8.png");
                    } else if (guesses === 1) {
                        hangmanImage.setAttribute("src", "assets/images/gallows9.png");
                    } else if (guesses === 0) {
                        hangmanImage.setAttribute("src", "assets/images/gameover.png");
                    }

                }
                
            }
        } 

        //If user runs out of tries, display You Lose text, play sound        
        if (guesses === 0) {
                displayCompPick.append(displayWord);
                gameOverSound.play();
        }

        //If user completes word, show image, play sound, increase winner counter
        if (lettersInWord === lettersGuessedInWord) {
            guessesRemaining.innerHTML = "You win!"
            movieClip.play();
            hangmanImage.setAttribute("src", newMovie.poster)

            wins += 1
            winsDiv.innerHTML = wins;
        }
        

    };

}


