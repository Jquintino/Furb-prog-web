import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Usuario } from "../entity/Usuario";
import * as crypto from "crypto";

export class UsuarioController {

    private userRepository = getRepository(Usuario);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {

        var mykey = crypto.createCipher('aes-128-cbc', process.env.passEnc);
        var mystr = mykey.update(request.body.password, 'utf8', 'hex')
        mystr += mykey.final('hex');
        request.body.password = mystr;
        this.userRepository.save(request.body);

        return response.status(204).send()

    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
        return response.status(204).send();
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let usertoUpdate = await this.userRepository.findOne(request.params.id);
        var mykey = crypto.createCipher('aes-128-cbc', process.env.passEnc);
        var mystr = mykey.update(request.body.password, 'utf8', 'hex')
        mystr += mykey.final('hex');
        request.body.password = mystr;
        usertoUpdate.username = request.body.username || usertoUpdate.username;
        usertoUpdate.password = request.body.password || usertoUpdate.password;
        this.userRepository.save(usertoUpdate);
        return response.status(204).send();
    }

    async login(user: String, pass: String) {
        let exist = await this.userRepository
            .createQueryBuilder()
            .select()
            .where("usuario.username = :usr and usuario.password = :pass", { usr: user, pass: pass })
            .getCount()
        return exist == 1
    }

    async selectAnyByUser(user: String) {
        return await this.userRepository
            .createQueryBuilder()
            .select()
            .where("usuario.username = :usr", { usr: user })
            .getOne()
    }

    async setupDatabaseStart() {
        let usr = await this.selectAnyByUser(process.env.StartUser);
        if (await usr == undefined) {
            this.save({ body: { username: process.env.StartUser, password: process.env.StartPass } }, "", "")
        }
    }

}