/*--------------------------------------Dynamic Cards----------------------------*/
var addCols = function (taskName, notes){
    var myCol = $('<div class="col-sm-2 col-md-2 sprintCard"></div>');
    var idRand = Math.floor(Math.random()*20);
    var myPanel = $('<div class="card" id="'+idRand+'Panel"><div class="card-block"><input class="form-control" type="text" id="taskPanels" value="'+taskName+'" /></div><div class="card-block"><input type="text" id="timePicker" readonly></div><div class="card-block"><input class="form-control" type="text" id="notesPanels" value="'+notes+'" maxlength="3" /></div><div class="card-block"><button type="button" class="btn btn-circle class="close" data-target="#'+idRand+'Panel" data-dismiss = "alert"><i class="fa fa-remove animated"></i></button></div></div>');
    myPanel.appendTo(myCol);
    myCol.insertBefore('#newCardEditor');
    
    $('.close').on('click', function(e){
      e.stopPropagation();  
          var $target = $(this).parents('.col-sm-2');
          $target.hide('slow', function(){ $target.remove(); });
    });
};

$('#btnGen').click(function(){
    addCols($('#taskPanels').val(), $('#notesPanels').val());
    return false;
});

$(".time-picker").hunterTimePicker({
    callback: function(e){ 
        alert(e.val());
    }
});
