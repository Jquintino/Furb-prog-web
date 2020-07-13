import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Comanda } from "../entity/Comanda";

export class ComandaController {

    private comandaRepository = getRepository(Comanda);

    async all(request: Request, response: Response, next: NextFunction) {
        
        return this.comandaRepository
            .createQueryBuilder("Comanda")
            .leftJoin("Comanda.produtos", "Produto_Comanda")
            .addSelect(["Produto_Comanda.id","Produto_Comanda.qtd", "Produto_Comanda.id_produto"])
            .leftJoin("Produto_Comanda.id_produto", "Produto")
            .addSelect(["Produto.id", "Produto.desc", "Produto.preco"])
            .getMany();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.comandaRepository
            .createQueryBuilder("Comanda")
            .leftJoin("Comanda.produtos", "Produto_Comanda")
            .addSelect(["Produto_Comanda.id","Produto_Comanda.qtd", "Produto_Comanda.id_produto"])
            .leftJoin("Produto_Comanda.id_produto", "Produto")
            .addSelect(["Produto.id", "Produto.desc", "Produto.preco"])
            .where("Comanda.id = :id", { id: request.params.id })
            .getOne()
    }

    async save(request: Request, response: Response, next: NextFunction) {
       
        try {
            if(request.body.mesa === undefined || request.body.mesa ===""){
                return response.status(400).send();
            }
            
            return this.comandaRepository.save(request.body);
        }
        catch{
            return response.status(403).send();
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let comandaToRemove = await this.comandaRepository.findOne(request.params.id);
        await this.comandaRepository.remove(comandaToRemove);
        return response.status(204).send();
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let comandatoUpdate = await this.comandaRepository.findOne(request.params.id);
        if(request.body.estado !== undefined){
            comandatoUpdate.estado = request.body.estado
        }
        comandatoUpdate.mesa = request.body.mesa || comandatoUpdate.mesa;
        console.log(comandatoUpdate)
        this.comandaRepository.save(comandatoUpdate);
        return response.status(204).send();
    }
}