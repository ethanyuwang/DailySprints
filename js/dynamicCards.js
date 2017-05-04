/*--------------------------------------Global Varibales----------------------------*/
var pausing = false;
var cardSuite = {};
userId = "Ethan"

/*--------------------------------------firebase----------------------------*/
var database = firebase.database();

var SprintCards = firebase.database().ref('posts/' + userId);
SprintCards.on('value', function(snapshot) {
	cardSuite = snapshot.val();
	populateAllCards();
});



/*--------------------------------------Dynamic Cards----------------------------*/
function card(taskName, duration_hours, duration_minutes, duration_seconds, notes) {
    this.taskName = taskName;
    this.duration_hours = duration_hours;
    this.duration_minutes = duration_minutes;
    this.notes = notes;
    this.duration_seconds = duration_seconds;
}

card.prototype.addCols = function() {
    this.id = new Date().getUTCMilliseconds();
    //Add current card to cardSuit
    cardSuite[this.id] = this
    var myCol = $('<div class="col-sm-4 col-md-2 sprintCard mx-auto" id="'+this.id+'"></div>');
    var myPanel = $('<div class="card" id="'+this.id+'Panel"> <div class="card-block"> <input class="form-control" type="text" id="'+this.id+'taskPanel" value="'+this.taskName+'"/> </div><div class="card-block"> <input type="text" id="'+this.id+'duration" name="duration"> </div><div class="card-block card-notes-section"> <div class="form-group"> <textarea class="form-control" id="'+this.id+'noets" rows="4">'+this.notes+'</textarea> </div></div><div class="card-block card-buttons-section"> <div class="row"> <button type="button" class="btn card-buttons close" data-target="#'+this.id+'Panel" data-dismiss="alert" id="'+this.id+'close"> <i class="fa fa-remove"></i> </button> </div></div></div>')
    myPanel.appendTo(myCol);
    myCol.insertBefore('#newCardEditor');

    //initialize timepicker for each new card and assign unique ids for hours and minutes sections
    $("#"+this.id+"duration").durationPicker({
        hours: {
            label: "h",
            min: 0,
            max: 24,
            id: "hours"+this.id
        },
        minutes: {
            label: "m",
            min: 0,
            max: 59,
            id: "minutes"+this.id
        },
        seconds: {
            label: "s",
            min: 0,
            max: 59,
            id: "seconds"+this.id
        },
        classname: 'form-control',
        type: 'number',
        responsive: true
    });
    //set time for each new card
    document.getElementById("duration-hours"+this.id).value = this.duration_hours;
    document.getElementById("duration-minutes"+this.id).value = this.duration_minutes;


    //on close button
    $('.close').on('click', function(e){
      e.stopPropagation();  
          var $target = $(this).parents('.sprintCard');
          $target.hide(function(){ $target.remove(); });
    });

card.prototype.updateInfo = function(taskName, duration_hours, duration_minutes, duration_seconds, notes) {
    this.taskName = taskName;
    this.duration_hours = duration_hours;
    this.duration_minutes = duration_minutes;
    this.duration_seconds = duration_seconds;
    this.notes = notes;
}
};

//TODO: probably not the best approach to save all for each snapshot but will do for now
function updateAll() {
	for(id in cardSuite) {
		var hours = document.getElementById("duration-hours"+id).value;
	    var minutes = document.getElementById("duration-minutes"+id).value;
	    var seconds = cardSuite[id].duration_seconds;
	    var taskName = document.getElementById(id+"taskPanel").value;
	    var notes = document.getElementById(id+"noets").value;
	    cardSuite[id].updateInfo(taskName, hours, minutes, seconds, notes);
	}

	//TODO: fix order of cards when save to data base
	firebase.database().ref('users/' + userId).set({
        cards: cardSuite
    });
}

function populateAllCards() {
	for(id in cardSuite) {
		var newCard = new card(cardSuite[id].taskName, cardSuite[id].duration_hours, cardSuite[id].duration_minutes, cardSuite[id].duration_seconds, cardSuite[id].notes)
        newCard.addCols();
	}
}

/*--------------------------------------button for generating new cards----------------------------*/
$('#btnGen').click(function(){
    var hours =  $('#duration-hours').val();
    var minutes = $('#duration-minutes').val();
    var task = $('#taskPanel').val();
    var notes = $('#notesPanel').val();
    if ((hours!=0||minutes!=0)&&(task!=""||notes!="")) {
    var newCard = new card(task, hours, minutes, 1, notes);
        newCard.addCols();
        //reset values after creating new card
        $('#taskPanel').val("");
        $('#duration-hours').val(0);
        $('#duration-minutes').val(0);
        $('#notesPanel').val("");
    }
    else {
        carEditor = document.getElementById("lastCard");
        carEditor.classList.remove("invalid-animation");
        void carEditor.offsetWidth;
        carEditor.classList.add("invalid-animation");
        //$('#newCardEditor').css("animation", "");
        //$('#newCardEditor').css("animation", "shake 0.82s cubic-bezier(.36,.07,.19,.97) both");

    }
    return true;
});

/*--------------------------------------button for pausing/restarting----------------------------*/
$('#btnPause').click(function(){
    pausing = !pausing;
    $(this).find('i').toggleClass('fa-pause fa-play');
});

/*--------------------------------------Update the count down every 1 minute----------------------------*/ 
setInterval(function() {
	//find first card
	var firstCard = $( ".sprintCard" ).first();
	if (firstCard!=null) {
		var id = firstCard.attr('id');
	    var hours = document.getElementById("duration-hours"+id).value;
	    var minutes = document.getElementById("duration-minutes"+id).value;
	    var seconds = cardSuite[id].duration_seconds;
	    //decrement counter, affected by pausing as well
	    if (!pausing) {

	    	if (seconds!=0) {
                seconds-=1;
            }
            else {
                seconds=59;
                minutes-=1;
            }
            if (minutes==0) {
                minutes=59;
                hours-=1;
            }

            //TODO: off by one minute here, to fix, display seconds or not?
            if (hours<=0&&minutes<=0) {
                $('#'+id+'close').click();
                cardSuite.splice(id, 1);
            }
            else {
                document.getElementById("duration-hours"+id).value = hours;
                document.getElementById("duration-minutes"+id).value = minutes;
            }
            //update seconds in the instance
            cardSuite[id].duration_seconds = seconds;
        }
	    //TODO: save cards #not the best place but will do for now
	    updateAll();
	}
}, 1000);


//change background TODO
function init() {
    var images = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg'];
    //var masthead = document.getElementsByTagName('masthead')[0];
    $('#masthead').css({'background-image': 'url(img/' + images[Math.floor(Math.random() * images.length)] + ')'});
    //body.style.backgroundImage = 'url(img/background/' + images[Math.floor(Math.random() * images.length)] + ')';
}


