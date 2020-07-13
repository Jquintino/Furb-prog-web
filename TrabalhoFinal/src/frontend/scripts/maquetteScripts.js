var h = maquette.h;
var projector = maquette.createProjector();
var dom = maquette.dom;
var comandafoco;
var Produtofoco;

function render() {
  return h('div#dummy', [
    h('h1', ["Trabalhos 5º semestre"]),
    h('p.lead', ["Esse site é o resultado do trabalho das materias Programação 3 e Banco de dados 2, feito por João Quintino e Nathan Reikdal"]),
    h('p.lead', ["Foi utilizado para a realização desse trabalho as seguintes tecnologias:"]),
    h('ul', [
      h('li', ["Node.js para rodar o servidor"]),
      h('li', ["TypeORM para gerenciar um banco de dados mysql"]),
      h('li', ["Express para o roteamento das chamadas da API"]),
      h('li', ["BootStrap como classe base de CSS, junto com um template do BootStrap para a base da criação da pagina"]),
      h('li', ["Maquettejs para renderizar os componentes de tela em uma aplicação em uma página"]),
    ]),
  ]);
}

function salvarProduto(evt) {

  evt.preventDefault();
  let produto;
  id = $("#idProd").html();
  produto = {
    desc: $("#desc").val(),
    preco: $("#valor").val()
  }
  
  if(id===undefined){
  
  fetch("/produto", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produto)
  })
    .then(async (resp) => {
      if (await resp.status == 200) {
        console.log("sucesso");
        render3();
      }
      else {
        console.log("erro");
      }

    })
  }
  else{
    fetch(`/produto/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    })
      .then(async (resp) => {
        if (await resp.status == 204) {
          console.log("sucesso");
          render3();
        }
        else {
          console.log("erro");
        }
  
      })
    }
  }



function salvarComanda(evt) {
  evt.preventDefault();
  let comanda;

  comanda = {
    mesa: $("#mesa").val(),
    estado: $("#check").is(':checked') ? 1 : 0
  }
  
  fetch("/comanda", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comanda)
  })
    .then(async (resp) => {
      if (await resp.status == 200) {
        console.log("sucesso");
        render2();
      }
      else {
        console.log("erro");
      }

    })

}

async function salvarProdutoComanda(id) {
  let j = {
    "qtd": $(`#qtd-${id}`).val()
  }

  fetch(`/produtocomanda/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(j)
  })
    .then(async (resp) => {
      if (await resp.status == 204) {
        console.log("sucesso");
      }
      else {
        console.log("erro");
      }

    })

  
  await criarComanda(comandafoco);
}

async function removerProdutoComada(id) {
  let b = await fetch(`/produtocomanda/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(async (resp) => {
      if (await resp.status == 204) {
        console.log("sucesso");
      }
      else {
        console.log("erro");
      }
    })
  criarComanda(comandafoco);
}

async function ativarComanda(estado){

  let j = {
    "estado": estado=="1"? 0 : 1
  }

  fetch(`/comanda/${comandafoco}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(j)
  })
    .then(async (resp) => {
      if (await resp.status == 204) {
        console.log("sucesso");
      }
      else {
        console.log("erro");
      }

    })
  
  criarComanda(comandafoco);

}

async function limparComanda(){
  
  let a = await fetch(`/comanda/${comandafoco}`)
  .then(async (resp)=>{
    return await resp.json();
  });
   
  a.produtos.forEach(async pc=>{
    
    let b = await fetch(`/produtocomanda/${pc.id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async (resp) => {
        if (await resp.status == 204) {
          console.log("sucesso");
        }
        else {
          console.log("erro");
        }
      })
  } )
}

async function excluirProduto(id) { 
  let b = await fetch(`/produto/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(async (resp) => {
      if (await resp.status == 204) {
        console.log("sucesso");
      }
      else {
        console.log("erro");
      }
    })
    render3();
 }

function components(item) {

  return {
    render: {
      function() {
        return h("tr", [
          h("td", [item.id_produto.desc]),
          h(`td`, [
            h(`input.w-25#qtd-${item.id}`, { "type": "number", "min": 1, "value": item.qtd })
          ]),
          h("td", [`${item.id_produto.preco}`]),
          h("td", [`${item.qtd * item.id_produto.preco}`]),
          h("td", [h("a.btn.btn-outline-primary.mr-1", { onclick: () => { salvarProdutoComanda(item.id) } }, ["Salvar"]),h("a.btn.btn-outline-danger", { onclick: () => removerProdutoComada(item.id) }, ["remover"])])
        ]);
      }
    }
  };
};

function gerarProduto(prod) {
  return {
    render: {
      function() {
        return h("option#novoProd", { "value": prod.id }, [prod.desc])
      }
    }
  }
}

async function novoProdutoComanda() {
  let j = {
    "qtd": $(`#qtd-novo`).val(),
    "id_produto": $("#selProduto").val(),
    "id_comanda": comandafoco
  }
  

  let b = await fetch(`/produtocomanda`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(j)
  })
    .then(async (resp) => {
      if (await resp.status == 204) {
        console.log("sucesso");
      }
      else {
        console.log("erro");
      }

    })


  criarComanda(comandafoco);
}

function mqtAddProduto() {
  return h('tr', [
    h("td", [h("select#selProduto")]
    ),
    h(`td`, [
      h(`input.w-25#qtd-novo`, { "type": "number", "min": 1, "value": 1 })
    ]),
    h("td"),
    h("td"),
    h("td", [h("a.btn.btn-outline-primary", { onclick: () => { novoProdutoComanda() } }, ["Salvar"])])
  ])
}

async function adicionarProdutoComanda() {

  let a = await fetch("/produtos").then(async (data) => {
    return data.json();
  })

  projector.append(document.getElementById("tableBody"), mqtAddProduto)
  a.forEach(element => {
    projector.append(document.getElementById("selProduto"), gerarProduto(element).render.function);
  });

}

var produtoDetalhe = function (produto) {


  
  return {
    render: {
      function() {
        return h(`div.card.border-dark.mb-3#comanda`, [
          h('div.card-header', [produto.desc]),
          h("a.invisible#idProd",[`${produto.id}`]),
          h('div.card-body.text-dark', [
            h('div.form-group.text-left.mt-5', [
              h('form', [
                h("label", ["Descrição"]),
                h("input#desc.form-control", { type: 'text' , "value":produto.desc}),
                h("label", { for: 'valor' }, ["Valor Unitario"]),
                h("input.form-control#valor", { type: 'number', "step": "0.01", value: produto.preco }),
                h("div.form-group.mt-4", [
                  h("button.btn.btn-primary.float-right.ml-2", { onclick: salvarProduto }, ["Salvar"]),
                  h("button.btn.btn-secondary.float-right", { onclick:()=>{ excluirProduto(produto.id) }}, ["Excluir"]),
                ]),
              ])
            ])
          ]),
        ]);
      }
    }
  }
}


var comandaDetalhe = function (comanda) {


  
  return {
    render: {
      function() {
        return h(`div.card.border-dark.mb-3#comanda`, [
          h('div.card-header', ['Comanda ' + comanda.id]),
          h('div.card-body.text-dark', [
            h("h5.card-tittle", [comanda.mesa]),
            h("p.card-text", ["A comanda está " + decodeEstado(comanda.estado)]),
            h("table.table", [
              h("thead.thead-dark", [
                h("tr", [
                  h("th", ["Produto"]),
                  h("th", ["Quantidade"]),
                  h("th", ["Valor Unitario"]),
                  h("th", ["Valor Total"]),
                  h("th.clearTableHeader", [""]),
                ])
              ]),

              h("tbody#tableBody", [comanda.produtos.map(function (params) {
                return components(params).render.function()
              })]),

            ])]),
          h('div.row.justify-content-end', [
            h("a.btn.btn-outline-danger.float-right.m-3",{onclick:limparComanda} ,["Limpar Comanda"]),
            h("a.btn.btn-outline-info.float-right.m-3",{onclick:()=>{ativarComanda(comanda.estado)}} ,["Ativar/Desativar a Comanda"]),
            h("a.btn.btn-outline-primary.float-right.m-3.mr-5", { onclick: () => { adicionarProdutoComanda() } }, ["Adicionar Produto"])

          ]),
        ]);
      }
    }
  }
}

var createComanda = function (comanda) {
  return {
    render: {
      function() {
        return h("div.col-4", [
          h('div.card.border-dark.mb-3.maxwidth18', { onclick: () => { criarComanda(comanda.id) } }, [
            h('div.card-header', ['Comanda ' + comanda.id]),
            h('div.card-body.text-dark', [
              h("h5.card-tittle", [comanda.mesa]),
              h("p.card-text", ["A comanda está " + decodeEstado(comanda.estado)])
            ])
          ])
        ]);
      }
    }
  }
}

var createProduto = function (produto) {
  return {
    render: {
      function() {
        return h("div.col-4", [
          h('div.card.border-dark.mb-3.maxwidth18', { onclick: () => { criarProduto(produto.id) } }, [
            h('div.card-header', ['' + produto.desc]),
            h('div.card-body.text-dark', [
              h("p.card-text", ["Valor Unitario: " + produto.preco])
            ])
          ])
        ]);
      }
    }
  }
}

function createProdutoComanda(produto) {
  return h("div", ["teste"])
}

function createProdutoInsert() {
  return h('div#dummy', [
    h('h1', ["Nova Produto"]),
    h('div.form-group.text-left.mt-5', [
      h('form', [
        h("label", ["Descrição"]),
        h("input#desc.form-control", { type: 'text' }),
        h("label", { for: 'valor' }, ["Valor Unitario"]),
        h("input.form-control#valor", { type: 'number', "step": "0.01", value: "0.00" }),
        h("div.form-group.mt-4", [
          h("button.btn.btn-primary.float-right.ml-2", { onclick: salvarProduto }, ["Salvar"]),
          h("button.btn.btn-secondary.float-right", { onclick: render3 }, ["Cancelar"]),

        ]),

      ])
    ])
  ])
}

function createComandaInsert() {

  return h('div#dummy', [
    h('h1', ["Nova Comanda"]),
    h('div.form-group.text-left.mt-5', [
      h('form', [
        h("label", ["Mesa"]),
        h("input#mesa.form-control", { type: 'text' }),
        h("div.form-group.form-check.mt-4", [
          h("input.form-check-input#check", { type: 'checkbox' }),
          h("label.check-label.ml-2", { for: 'check' }, ["A comanda está ativa?"])
        ]),
        h("div.form-group.mt-4", [
          h("button.btn.btn-primary.float-right.ml-2", { onclick: salvarComanda }, ["Salvar"]),
          h("button.btn.btn-secondary.float-right", { onclick: render2 }, ["Cancelar"]),

        ]),

      ])
    ])
  ])
}

async function criarComanda(id) {
  comandafoco = id;
  let a = await fetch(`/comanda/${id}`).then(async (data) => {
    return data.json();
  })
  projector.replace(document.getElementById("dummy"), blankrender);

  projector.append(document.getElementById("dummy"), comandaDetalhe(a).render.function);

}

async function criarProduto(id) {
  Produtofoco = id;
  let a = await fetch(`/produto/${id}`).then(async (data) => {
    return data.json();
  })
  projector.replace(document.getElementById("dummy"), blankrender);

  projector.append(document.getElementById("dummy"), produtoDetalhe(a).render.function);

}

function abrirCriarComanda() {

  projector.replace(document.getElementById("dummy"), createComandaInsert);
}

function abrirCriarProduto() {

  projector.replace(document.getElementById("dummy"), createProdutoInsert);
}

function blankrender() {
  return h('div#dummy', []);
}

function renderb() {
  return h('div#dummy', [
    h('div.row.clearfix.justify-content-end', [

      h("a.btn.btn-outline-primary.float-right", { onclick: abrirCriarComanda }, ["Adicionar comanda"])

    ]),
    h('div#div-Comanda.row.mt-5')]);
}

function renderc() {
  return h('div#dummy', [
    h('div.row.clearfix.justify-content-end', [

      h("a.btn.btn-outline-primary.float-right", { onclick: abrirCriarProduto }, ["Adicionar Produto"])

    ]),
    h('div#div-produto.row.mt-5')]);
}

function decodeEstado(estado) {
  if (estado !== "0") {
    return "ativa"
  }
  else {
    return "inativa"
  }
}

async function render2() {

  let a = await fetch("/comandas").then(async (data) => {
    return data.json();
  })
  projector.replace(document.getElementById("dummy"), renderb);
  a.forEach(element => {
    projector.append(document.getElementById("div-Comanda"), createComanda(element).render.function);
  });

}

async function render3() {

  let a = await fetch("/produtos").then(async (data) => {
    return data.json();
  })
  
  projector.replace(document.getElementById("dummy"), renderc);
  a.forEach(element => {
    projector.append(document.getElementById("div-produto"), createProduto(element).render.function);
  });

}

document.addEventListener('DOMContentLoaded', function () {
  projector.append(document.getElementById("main"), render);


  $("#Comanda").click(function () {
    $(".nav-link").removeClass("active");
    $("#Comanda").addClass("active");
    render2();
  })

  $("#home").click(function () {
    $(".nav-link").removeClass("active");
    $("#home").addClass("active");
    projector.replace(document.getElementById("dummy"), render);
  })

  $("#Produto").click(function () {
    $(".nav-link").removeClass("active");
    $("#Produto").addClass("active");
    render3();
  })
});
