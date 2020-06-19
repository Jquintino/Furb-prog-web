const url= "http://rest-api-employees.jmborges.site/api/v1/"    
var insere = true;
var id_edt;

$(document).ready(function () {


    $.get( url+"employees",
        function (data, textStatus, jqXHR) {
            //for ( i=0 ; i <data.length;i++){
            data.data.forEach(function (element) {
                $('#corpo-tabela').append($('<tr>')
                    .append($('<td>')
                        .text(element.id))
                    .append($('<td>')
                        .text(element.employee_name))
                    .append($('<td>')
                        .text(element.employee_salary))
                    .append($('<td>')
                        .text(element.employee_age))
                    .append($('<td>')
                        .text(element.profile_image))
                    .append($('<td>')
                        .html("<a id='"+element.id+"' onclick=edt(this)>editar</a> | <a id='"+element.id+"' onclick=exc(this)>excluir</a>"))
                );
            });
        }
    );

  
    $('#salvar').click(function (e) { 
    if (insere){
        var name = $('#nome').val();
        var salary= $('#salario').val();
        var age= $('#idade').val();
        var profile_image= $('#avatar').val();
        var employee = new Object();
        employee.name= $('#nome').val();
        employee.salary= $('#salario').val();
        employee.age= $('#idade').val();
        employee.profile_image= $('#avatar').val();
        var teste = JSON.stringify(employee);
        $.ajax({
            url: url+'create',
            type: 'POST',
            data: 'name='+name+'salary='+salary,
            dataType: 'text',
            success: function(response, textStatus, jqXHR) {
              alert("Yay!");
              location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown){
              alert(textStatus, errorThrown);
           }
         });
        //$.post(url+"create", teste);}
    }else{
        var employee = new Object();
        employee.name= $('#nome').val();
        employee.salary= $('#salario').val();
        employee.age= $('#idade').val();
        employee.profile_image= $('#avatar').val();
        var teste = JSON.stringify(employee);
        $.post(url+"update/"+id_edt, teste,
            function (data, textStatus, jqXHR) {
                alert('a');
            },
            "dataType"
        );
    }
    });


});
function edt(param){
    var employee;
    $.get(url+"employee/"+param.id, 
        function (data, textStatus, jqXHR) {
            employee = data;
            $('#titulo').text('Alterando o empregado '+employee.data.employee_name);
            $("#nome").val(employee.data.employee_name);
            $('#salario').val(employee.data.employee_salary);
            $('#idade').val(employee.data.employee_age);
            $('#avatar').val(employee.data.profile_image);
            insere = false;
            id_edt = employee.data.id;
        }
        );
} 


function exc(param){
    $.get(url+"employee/"+param.id, 
        function (data, textStatus, jqXHR) {
            if (confirm('Deseja realmente excluir o empregado' + data.data.employee_name+'?')){
                deletee(param.id);
            }
    })
 }

 function deletee(id){
    $.ajax({
        url: url+'/delete/'+id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function(result) {
            alert('sucesso');
            location.reload();
        },
        error: function(request,msg,error) {
            // handle failure
        }
    });
 } 