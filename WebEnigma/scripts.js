var active = false;
var sequence = 0;
var puzzle = null;
var skips = 0;

$(document).ready(function(){
	var $Q = $('.question-box');
	var $C = $('.command-box');
	var $P = $('.previous-commands')
	var $c = $('#input-box');
	puzzle = new Puzzle(0)

    $(document).keydown(function(key){
        vale = $c.val().toLowerCase();
		if (key.which == 13){
			$P.prepend('<p>> '+vale+': '+ action(vale)+'</p>');
			$c.val("");
		}
    });
});

function action(keyword){
	//keyword = keyword.substring(2,keyword.length);

	if (!active){
        if (keyword == "start"){
    		active = true;
			$('#command').css('color', 'rgb(5,200,5)');
			$('#input-box').css('color', 'rgb(5,200,5)');
			$('#title-bar').css('border-image', 'linear-gradient(to bottom, rgb(5,200,5), black) 1 100%')
			$('h1').css('color', 'rgb(5,200,5)');
			$('h1').css('text-shadow', '2px 2px darkgreen');
			$('#title-bar').css('outline-color', 'rgb(5,200,5)');
			$("#google-icon").css("display", "inline");
			puzzle.display()
    		return "let the games begin, you may skip puzzles with the keyword 'skip'";
        } else if (keyword == "enigma"){
            return "What do you need to do to finish a race?";
        }
    } else {
		if (puzzle.keys.indexOf(keyword) != -1){
			if (sequence < 17){
				sequence++;
				puzzle = new Puzzle(sequence);
				puzzle.display()
				return "Correct"
			}
			$("#puzzle_name").css("text-align", "center")
			$("#puzzle_text").html("");
			$("#puzzle_image").attr("src", "");
			if (skips == 0){
				$("#puzzle_name").css("color","rgb(5,200,5)")
				$('h1').css('color', 'grey');
				$("#puzzle_name").html("You have solved the enigma");
				return "You have solved the enigma"
			} else {
				$("#puzzle_name").css("color","darkred")
				$("#title-bar").css("outline-color","darkred")
				$('h1').css('color', 'grey');
				$('h1').css('text-shadow', '2px 2px darkgrey');
				$('#title-bar').css('border-image', 'linear-gradient(to bottom, darkred, black) 1 100%')
				$("#puzzle_name").html("You failed to solve the enigma. Try again without skipping any questions");
				return "You failed to solve the enigma. Try again without skipping any questions"
			}
			
		} else if (keyword == "skip"){
			if (sequence < 17){
				skips++;
				sequence++;
				puzzle = new Puzzle(sequence);
				puzzle.display()
				return "Skipped"
			} else {
				return "You may not skip this question."
			}
		} else {
			return "Incorrect"
		}
	}
}

class Puzzle {
	constructor(sequence){
		this.sequence = sequence;
		this.name = "";
		this.text = [];
		this.pic = null;
		this.google = false;
		this.keys = [];
		this.build();
	}

	build(){
		this._data = "\
				First Question~Who am I?~puzzles/images/equation.jpeg~true~fibonacci*\
				Riddle~As a stone inside a tree, I'll help your words outlive thee._But if you push me as I stand, the more I move the less I am._ _What am I?~null~~a pencil_pencil*\
				Aptitude test~ What is the next number in this sequence?_0 1 3 3 8 21 ?~null~true~165*\
				Riddle~What is better than god, worse than the devil,_dead people eat it, but if you eat it you die?~null~~nothing*\
				????~odgovor je jednostavan~null~true~simple*\
				Personal Riddle (Easy)~_A pale shadow on dark water,_You'll see me when sight is lost,_A half of me is all you'll see and even that may differ._ _What am I?~null~~the moon_moon*\
				Personal Riddle (Difficult)~_I am given in times when a guiding hand is needed,_You will not need me if you have me,_but when you need me, with the natives I will be._ _What am I?~~null~directions_a direction_direction*\
				Squares~How many squares are there in this picture?~puzzles/images/squares.jpeg~~40_41*\
				Words~How many meanings does the word \"One\" have?~null~true~3*\
				Words~How many meanings does the word \"Three\" have?~null~true~one*\
				Brain teaser~Which numbers are on the keyboard?~~null~all of them_all_infinite_infinity*\
				Trick~What does one do when they are coming into a room, or coming back to a room~null~~*\
				Brain teaser~Some months have 30 days, some have 31 days._How many months have 28 days?~null~~12_all_all of them*\
				Question riddle~What grows when it eats, but dies when it drinks?~null~~a fire_fire_a flame_flames_teenagers*\
				What am I?~05 14 09 07 13 01~null~~enigma*\
				Story~THE Tribe leader Ignited his enemy's clothes as his Tribe Listened to the sound_of their prisonEr's pleading, without mercy or remorse._In this tale will you find the answer~null~~story*\
				History~What is the 6th name given to the Lady of the Lake?~null~true~nivian*\
				Final question~This thing all things devours:_Birds, beasts, trees, flowers;_Gnaws iron, bites steel;_Grinds hard stones to meal;_Slays king, ruins town,_And beats high mountain down._ _What am I?~null~~time*\
			   "
		this.lines = this._data.split("*")
		this.contentsList = this.lines[this.sequence].split("~")
		this.name = this.contentsList[0];
		this.text = this.contentsList[1].split("_");
		this.pic = (this.contentsList[2] != "null") ? this.contentsList[2] : null;
		this.google = (this.contentsList[3] == "true")? true:false ;
		this.keys = this.contentsList[4].split("_");
	}

	display(){
		$("#puzzle_name").html(this.name);
		$("#puzzle_text").html("");
		for (var i = 0; i < this.text.length; i++){
			$("#puzzle_text").append("<p>"+this.text[i]+"</p>");
		} 
		$("#puzzle_image").attr("src", this.pic);
		if (this.google) {
			$("#google-icon").attr("src", "puzzles/images/googlecheck.png")
		} else {
			$("#google-icon").attr("src", "puzzles/images/googlex.png")
		}
	}
}

