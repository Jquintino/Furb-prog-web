import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Produto } from "../entity/Produto";

export class ProdutoController {

    private produtoRepository = getRepository(Produto);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.produtoRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.produtoRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try{
        return this.produtoRepository.save(request.body);
    }
    catch{
        return response.status(400).send()
    }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try{
        let produtoToRemove = await this.produtoRepository.findOne(request.params.id);
        await this.produtoRepository.remove(produtoToRemove);
        return response.status(204).send();
        }catch{
            return response.status(400).send()
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try{
        let produtotoUpdate = await this.produtoRepository.findOne(request.params.id);
        produtotoUpdate.desc = request.body.desc || produtotoUpdate.desc;
        produtotoUpdate.preco = request.body.preco || produtotoUpdate.preco;
        this.produtoRepository.save(produtotoUpdate);
        return response.status(204).send();
        }
        catch{
            return response.status(400).send()
        }
    }

}