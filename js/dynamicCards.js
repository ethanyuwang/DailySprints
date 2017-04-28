/*--------------------------------------Dynamic Cards----------------------------*/
function card(id, duration, taskName, notes) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
}

var addCols = function (taskName, notes){
    var myCol = $('<div class="col-sm-2 col-md-2 sprintCard"></div>');
    var idRand = Math.floor(Math.random()*20);
    //var myPanel = $('<div class="card" id="'+idRand+'Panel"><div class="card-block"><input class="form-control" type="text" id="taskPanels" value="'+taskName+'" /></div><div class="card-block"><input type="text" id="timePicker" readonly></div><div class="card-block"><input class="form-control" type="text" id="notesPanels" value="'+notes+'" maxlength="3" /></div><div class="card-block"><button type="button" class="btn btn-circle class="close" data-target="#'+idRand+'Panel" data-dismiss = "alert"><i class="fa fa-remove animated"></i></button></div></div>');
    var myPanel = $('<div class="card" id="'+idRand+'Panel"> <div class="card-block"> <input class="form-control" type="text" id="taskPanels" value="'+taskName+'"/> </div><div class="card-block"> <input type="text" id="timePicker" readonly> </div><div class="card-block card-notes-section"> <div class="form-group"> <textarea class="form-control" id="notesPanels" rows="4" value="'+notes+'"></textarea> </div></div><div class="card-block card-buttons-section"> <div class="row"> <button type="button" class="btn card-buttons close" data-target="#'+idRand+'Panel" data-dismiss="alert"> <i class="fa fa-remove"></i> </button> </div></div></div>')
    myPanel.appendTo(myCol);
    myCol.insertBefore('#newCardEditor');
    
    $('.close').on('click', function(e){
      e.stopPropagation();  
          var $target = $(this).parents('.col-sm-2');
          $target.hide('slow', function(){ $target.remove(); });
    });
};


$('#btnGen').click(function(){
    addCols($('#taskPanels').val(), $('textarea#notesPanels').val());
    return true;
});



//change background
function init() {
    var images = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg'];
    //var masthead = document.getElementsByTagName('masthead')[0];
    $('#masthead').css({'background-image': 'url(img/' + images[Math.floor(Math.random() * images.length)] + ')'});
    //body.style.backgroundImage = 'url(img/background/' + images[Math.floor(Math.random() * images.length)] + ')';
}