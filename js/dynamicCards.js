/*--------------------------------------Dynamic Cards----------------------------*/
function card(taskName, duration, notes) {
    this.duration = duration;
    this.taskName = taskName;
    this.notes = notes;
}

card.prototype.addCols = function() {
    var myCol = $('<div class="col-sm-2 col-md-2 sprintCard"></div>');
    this.id = Math.floor(Math.random()*20);
    var myPanel = $('<div class="card" id="'+this.id+'Panel"> <div class="card-block"> <input class="form-control" type="text" id="taskPanel#'+this.id+'" value="'+this.taskName+'"/> </div><div class="card-block"> <input type="text" id="duration" name="duration"> </div><div class="card-block card-notes-section"> <div class="form-group"> <textarea class="form-control" id="notesPanel#'+this.id+'" rows="4">'+this.notes+'</textarea> </div></div><div class="card-block card-buttons-section"> <div class="row"> <button type="button" class="btn card-buttons close" data-target="#'+this.id+'Panel" data-dismiss="alert"> <i class="fa fa-remove"></i> </button> </div></div></div>')
    myPanel.appendTo(myCol);
    myCol.insertBefore('#newCardEditor');

    $('.close').on('click', function(e){
      e.stopPropagation();  
          var $target = $(this).parents('.col-sm-2');
          $target.hide(function(){ $target.remove(); });
    });
};





$('#btnGen').click(function(){
    var newCard = new card($('#taskPanel').val(), $('#duration').val(), $('#notesPanel').val());
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