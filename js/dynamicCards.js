

/*--------------------------------------Dynamic Cards----------------------------*/
function card(taskName, duration_hours, duration_minutes, notes) {
    this.taskName = taskName;
    this.duration_hours = duration_hours;
    this.duration_minutes = duration_minutes;
    this.notes = notes;
}

card.prototype.addCols = function() {
    var myCol = $('<div class="col-sm-2 col-md-2 sprintCard"></div>');
    this.id = new Date().getUTCMilliseconds();
    var myPanel = $('<div class="card" id="'+this.id+'Panel"> <div class="card-block"> <input class="form-control" type="text" id="'+this.id+'taskPanel" value="'+this.taskName+'"/> </div><div class="card-block"> <input type="text" id="'+this.id+'duration" name="duration"> </div><div class="card-block card-notes-section"> <div class="form-group"> <textarea class="form-control" id="'+this.id+'" rows="4">'+this.notes+'</textarea> </div></div><div class="card-block card-buttons-section"> <div class="row"> <button type="button" class="btn card-buttons close" data-target="#'+this.id+'Panel" data-dismiss="alert"> <i class="fa fa-remove"></i> </button> </div></div></div>')
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
    var newCard = new card($('#taskPanel').val(), $('#duration-hours').val(), $('#duration-minutes').val(), $('#notesPanel').val());
    newCard.addCols();
    $('#taskPanels').attr("value") = "";
    //addCols($('#taskPanels').val(), $("#duration").val(), $('textarea#notesPanels').val());
    return true;
});



//change background to fix
function init() {
    var images = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg'];
    //var masthead = document.getElementsByTagName('masthead')[0];
    $('#masthead').css({'background-image': 'url(img/' + images[Math.floor(Math.random() * images.length)] + ')'});
    //body.style.backgroundImage = 'url(img/background/' + images[Math.floor(Math.random() * images.length)] + ')';
}


