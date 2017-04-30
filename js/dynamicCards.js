

/*--------------------------------------Dynamic Cards----------------------------*/
function card(taskName, duration_hours, duration_minutes, notes) {
    this.taskName = taskName;
    this.duration_hours = duration_hours;
    this.duration_minutes = duration_minutes;
    this.notes = notes;
}

card.prototype.addCols = function() {
    this.id = new Date().getUTCMilliseconds();
    var myCol = $('<div class="col-sm-2 col-md-2 sprintCard mx-auto" id="'+this.id+'"></div>');
    var myPanel = $('<div class="card" id="'+this.id+'Panel"> <div class="card-block"> <input class="form-control" type="text" id="'+this.id+'taskPanel" value="'+this.taskName+'"/> </div><div class="card-block"> <input type="text" id="'+this.id+'duration" name="duration"> </div><div class="card-block card-notes-section"> <div class="form-group"> <textarea class="form-control" id="'+this.id+'" rows="4">'+this.notes+'</textarea> </div></div><div class="card-block card-buttons-section"> <div class="row"> <button type="button" class="btn card-buttons close" data-target="#'+this.id+'Panel" data-dismiss="alert" id="'+this.id+'close"> <i class="fa fa-remove"></i> </button> </div></div></div>')
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
          var $target = $(this).parents('.col-sm-2');
          $target.hide(function(){ $target.remove(); });
    });
};

$('#btnGen').click(function(){
    var hours =  $('#duration-hours').val();
    var minutes = $('#duration-minutes').val();
    var task = $('#taskPanel').val();
    var notes = $('#notesPanel').val();
    if ((hours!=0&&minutes!=0)&&(task!=""||notes!="")) {
    var newCard = new card(task, hours, minutes, notes);
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

// Update the count down every 1 minute
setInterval(function() {

    //get the first card's id
    //var id = $( "sprintCard:first" ).attr('id');
    var firstCard = $( ".sprintCard" ).first();
    if (firstCard!=null) {
        var id = firstCard.attr('id');

        var hours = document.getElementById("duration-hours"+id).value;
        var minutes = document.getElementById("duration-minutes"+id).value;

        if (minutes!=0) {
            minutes-=1;
        }
        else {
            minutes=59;
            hours-=1;
        }

        if (hours<=0&&minutes<=0) {
            $('#'+id+'close').click();
        }
        else {
            document.getElementById("duration-hours"+id).value = hours;
            document.getElementById("duration-minutes"+id).value = minutes;
        }
    }
}, 1000);




//change background to fix
function init() {
    var images = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg'];
    //var masthead = document.getElementsByTagName('masthead')[0];
    $('#masthead').css({'background-image': 'url(img/' + images[Math.floor(Math.random() * images.length)] + ')'});
    //body.style.backgroundImage = 'url(img/background/' + images[Math.floor(Math.random() * images.length)] + ')';
}


