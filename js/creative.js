/*--------------------------------------Dynamic Cards----------------------------*/
var addCols = function (taskName, notes){
    var myCol = $('<div class="col-sm-2 col-md-2"></div>');
    //var myPanel = $('<div class="card card-outline-info" id="'+i+'Panel"><div class="card-block"><div class="card-title"><span>Card #'+i+'</span><button type="button" class="close" data-target="#'+i+'Panel" data-dismiss="alert"><span class="float-right"><i class="fa fa-remove"></i></span></button></div><p>Some text in '+i+' </p><img src="//placehold.it/50/eeeeee" class="rounded rounded-circle"></div></div>');
    var myPanel = $('<div class="card"><div class="card-block"><input class="form-control" type="text" id="taskPanels" value="'+taskName+'" /></div><div class="card-block"><input type="text" id="timePicker" readonly></div><div class="card-block"><input class="form-control" type="text" id="notesPanels" value="'+notes+'" maxlength="3" /></div><div class="card-block"><button type="button" class="btn btn-circle" id="btnGen"><i class="fa fa-remove animated"></i></button></div></div>');
    myPanel.appendTo(myCol);
    //$("#contentPanel .div:last").before(myCol);
    //myCol.before($('<div>'));
    myCol.insertBefore('#newCardEditor');
    //myCol.appendTo('#contentPanel');
    
    $('.close').on('click', function(e){
      e.stopPropagation();  
          var $target = $(this).parents('.col-sm-3');
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
