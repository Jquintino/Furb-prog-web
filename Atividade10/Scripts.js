$(document).ready(function(){
    
    
    $("#bt1").click(function(){
        $(".vermelho").hide();  
    });

    $("#bt2").click(function(){
        $("#questao02 p:nth-child(even)").hide();
    });

    $("#bt3").click(function(){
        $("#questao02 p:nth-child(odd)").append(" - par");
    });
    
    $("#bt4").click(function(){
        $(".vermelho").addClass("azul");
        $(".azul").addClass("vermelho");  
    });

    $("#bt5").click(function(){
        $("#p1").append(" texto do primeiro p alterado");
    });
    
    $("#bt6").click(function(){
        $("#p8").append(" texto do ultimo p alterado");
    });

    $("#bt7").click(function(){
        $("#questao02 p:nth-child(10)").attr("background-color","green");
    });
    
    $("#bt8").click(function(){
        $("img:first-child").attr("src","http://www.furb.br/web/img/logo-furb.gif");
    });

    $("#bt9").click(function(){
        $("#questao02").hide();
        window.setTimeout(function(){
    
        $("#questao02").show();},1500);
    });


    $("#adiciona").click(function(){
        $("#lista").append("<li>a</li>");
        
    });











});