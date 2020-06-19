$(document).ready(function () {
    
    if ($(window).innerWidth() < 800){
        $( "#dropdown" ).removeClass("dropright");
        $( "#dropdown" ).addClass("dropdown");    
    }
    else{
        $( "#dropdown" ).addClass("dropright");
        $( "#dropdown" ).removeClass("dropdown");
    
    }
    
$( window ).resize(function() {
    if ($(window).innerWidth() < 800){
        $( "#dropdown" ).removeClass("dropright");
        $( "#dropdown" ).addClass("dropdown");    
    }
    else{
        $( "#dropdown" ).addClass("dropright");
        $( "#dropdown" ).removeClass("dropdown");
    
    }
    
  });
    
    $('#form').submit(false);   

    $("#login").click(function (e) { 
        
        document.cookie = "Usuario="+$("#Usuario").val() + ";";
    //    alert(document.cookie);
    var x = decodeURIComponent(document.cookie);
    var y = x.split(';');
    const _usu = "Usuario=";
    var usuario = y[0].substring(_usu.length,y[0].length);

    if(x!=="undefined" && usuario != ""){
        $("#pre-form").empty();
        $("#pre-form").html('<p>Bem vindo '+usuario+'.   <a id="logout">logout</a></p>');
        
        $("#logout").click(function (e) { 
    
            location.reload();
        });
    
    }
    });
    
    

});


