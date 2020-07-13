import {UsuarioController} from "./backend/controller/UsuarioController";
import {ComandaController} from "./backend/controller/ComandaController";
import {ProdutoController} from "./backend/controller/ProdutoController";
import {ProdutoComandaController} from "./backend/controller/Produto_ComandaController";

export const Routes = [{
    method: "get",
    route: "/usuario",
    controller: UsuarioController,
    action: "all"
},{
    method: "get",
    route: "/usuario/:id",
    controller: UsuarioController,
    action: "one"
},{
    method: "post",
    route: "/usuario",
    controller: UsuarioController,
    action: "save"
},{
    method: "delete",
    route: "/usuario/:id",
    controller: UsuarioController,
    action: "remove"
},{
    method: "get",
    route: "/comandas",
    controller: ComandaController,
    action: "all"
},{
    method: "get",
    route: "/comanda/:id",
    controller: ComandaController,
    action: "one"
},{
    method: "post",
    route: "/comanda",
    controller: ComandaController,
    action: "save"
},{
    method: "delete",
    route: "/comanda/:id",
    controller: ComandaController,
    action: "remove"
},{
    method: "put",
    route: "/comanda/:id",
    controller: ComandaController,
    action: "update"
},{
    method: "get",
    route: "/produtos",
    controller: ProdutoController,
    action: "all"
},{
    method: "get",
    route: "/produto/:id",
    controller: ProdutoController,
    action: "one"
},{
    method: "post",
    route: "/produto",
    controller: ProdutoController,
    action: "save"
},{
    method: "delete",
    route: "/produto/:id",
    controller: ProdutoController,
    action: "remove"
},{
    method: "put",
    route: "/produto/:id",
    controller: ProdutoController,
    action: "update"
},{
    method: "get",
    route: "/produtoComandas",
    controller: ProdutoComandaController,
    action: "all"
},{
    method: "get",
    route: "/produtoComanda/:id",
    controller: ProdutoComandaController,
    action: "one"
},{
    method: "post",
    route: "/produtoComanda",
    controller: ProdutoComandaController,
    action: "save"
},{
    method: "delete",
    route: "/produtoComanda/:id",
    controller: ProdutoComandaController,
    action: "remove"
},{
    method: "put",
    route: "/produtoComanda/:id",
    controller: ProdutoComandaController,
    action: "update"
}
];