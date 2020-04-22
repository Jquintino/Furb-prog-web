function InstHover(){
    document.getElementsByClassName('Submenu-Inst')[0].style.display ="block";
}
function InstOffHover(){
    document.getElementsByClassName('Submenu-Inst')[0].style.display ="none";
}
function ProdHover(){
    document.getElementsByClassName('Submenu-Prod')[0].style.display ="block";
}
function ProdOffHover(){
    document.getElementsByClassName('Submenu-Prod')[0].style.display ="none";
}
function SobreHover(){
    document.getElementsByClassName('Submenu-Sobre')[0].style.display ="block";
}
function SobreOffHover(){
    document.getElementsByClassName('Submenu-Sobre')[0].style.display ="none";
}
function criaLista(){
    document.getElementById("Conteudo").innerHTML ="<h1>titulo</h1><ul>    <li>Criando</li>    <li>Lista</li><li>Não</li>    <li>Ordenada</li><ul>";
}
function listaFilmes(){
    var filme1 = {nome:"Maquina Mortifera",ano:"1987",genero:"Ação/Thriller"}
    var filme2 = {nome:"Corra que a policia vem ai",ano:"1988",genero:"Comedia/Policial"}
    var filme3 = {nome:"Killer Sofa",ano:"2020",genero:"Comédia/Thriller"}
    var conteudo = document.getElementById("Conteudo2");
    
    conteudo.innerHTML = "<h4> Filme: "+filme1.nome + " Ano: "+ filme1.ano + " é do genero " + filme1.genero+"</h4>";
    conteudo.innerHTML =conteudo.innerHTML+ "<h4> Filme: "+filme2.nome + " Ano: "+ filme2.ano + " é do genero " + filme2.genero+"</h4>";
    conteudo.innerHTML =conteudo.innerHTML+ "<h4> Filme: "+filme3.nome + " Ano: "+ filme3.ano + " é do genero " + filme3.genero+"</h4>";
}
function calculaParImpar(){
    var num1 = Number(document.getElementById("numero1").value);
    var num2 = Number(document.getElementById("numero2").value);
    var num3 = Number(document.getElementById("numero3").value);
    var soma = num1+num2+num3;
    var ispar = (soma%2) == 0;
    if (ispar){
        alert("A soma foi :" + soma + " que é par")
    }
    else{
        alert("A soma foi :" + soma + " que é impar")
    }
    
}
function fatorial(){
    var num = document.getElementById("numero").value;
    var i = 1;
    
    if (num >1){
    for(x=num;x>1;x--) {
          i = i * x;
    }
}
    document.getElementById("Conteudo").innerHTML = "O fatorial do numero "+num+" é "+i;

}