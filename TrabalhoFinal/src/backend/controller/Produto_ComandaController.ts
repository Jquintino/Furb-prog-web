import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Produto_Comanda } from "../entity/Produto_Comanda";

export class ProdutoComandaController {

    private produto_comandaRepository = getRepository(Produto_Comanda);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.produto_comandaRepository
            .createQueryBuilder("Produto_Comanda")
            .leftJoin("Produto_Comanda.id_produto", "Produto")
            .addSelect(["Produto.id", "Produto.desc", "Produto.preco"])
            .getMany();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.produto_comandaRepository
            .createQueryBuilder("Produto_Comanda")
            .leftJoin("Produto_Comanda.id_produto", "Produto")
            .addSelect(["Produto.id", "Produto.desc", "Produto.preco"])
            .where("Produto_Comanda.id_comanda = :id", { id: request.params.id })
            .getOne()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try{
        let produto_comandatoUpdate = await this.selectByFKs(request.body.id_produto, request.body.id_comanda);
        
        if (produto_comandatoUpdate == undefined) {
            return this.produto_comandaRepository.save(request.body);
        }
        else {
            produto_comandatoUpdate.qtd = produto_comandatoUpdate.qtd + Number(request.body.qtd);
            return this.produto_comandaRepository.save(produto_comandatoUpdate);
        }}
        catch{
            return response.status(400).send();
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.produto_comandaRepository.findOne(request.params.id);
        await this.produto_comandaRepository.remove(userToRemove);
        return response.status(204).send();
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try{
        let produto_comandatoUpdate = await this.produto_comandaRepository.findOne(request.params.id);
        produto_comandatoUpdate.qtd = request.body.qtd || produto_comandatoUpdate.qtd;
        produto_comandatoUpdate.id_comanda = request.body.id_comanda || produto_comandatoUpdate.id_comanda;
        produto_comandatoUpdate.id_produto = request.body.id_produto || produto_comandatoUpdate.id_produto;
        this.produto_comandaRepository.save(produto_comandatoUpdate);
        return response.status(204).send();
        }
        catch{
            return response.status(400).send();
        }
    }

    async selectByFKs(fk_produto, fk_comanda) {
        let produto_comandatoSelect = await this.produto_comandaRepository
            .createQueryBuilder()
            .where("Produto_Comanda.id_produto = :fkProd and Produto_Comanda.id_comanda = :fkCom", { fkProd: fk_produto, fkCom: fk_comanda })
            .getOne();
        return await produto_comandatoSelect;
    }

    async selectByComanda(fk_comanda) {
        let produto_comandatoSelect = await this.produto_comandaRepository
            .createQueryBuilder()
            .where("Produto_Comanda.id_comanda = :fkCom", { fkCom: fk_comanda })
            .getOne();
        return await produto_comandatoSelect;
    }

}