import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import * as  cookieParser from 'cookie-parser';
import { UsuarioController } from "./backend/controller/UsuarioController";
import {ComandaController} from "./backend/controller/ComandaController";

createConnection().then(async connection => {

    
    const app = express();
    const path = require('path');
    const http = require('http');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.engine('html', require('ejs').renderFile);

    app.use(bodyParser.json());
    app.use(cookieParser());
    require("dotenv-safe").config();
    var jwt = require('jsonwebtoken');
    const crypto = require('crypto');
    app.set('views', __dirname + '/frontend/views');
    app.set('view engine', 'html');




    Routes.forEach(route => {
        (app as any)[route.method](route.route, /*verifyJWT,*/ (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    let usr = new UsuarioController;
    usr.setupDatabaseStart();

    app.post('/login', async (req, res, next) => {

        var mykey = crypto.createCipher('aes-128-cbc', process.env.passEnc);
        var mystr = mykey.update(req.body.password, 'utf8', 'hex')
        mystr += mykey.final('hex');
        req.body.password = mystr;


        let usr = new UsuarioController;

        if (await usr.login(req.body.username, req.body.password)) {
            let sltId = await usr.selectAnyByUser(req.body.username);
            const id = sltId.id;
            var token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 300
            });
            return res.json({ auth: true, token: token });
        }

        res.status(500).json({ message: 'Login inválido!' });
    })

    app.post('/logout', function (req, res) {
        res.json({ auth: false, token: null });
    })


    function verifyJWT(req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });


            req.userId = decoded.id;
            next();
        });
    }

    app.get('/scripts/maquetteScripts.js', function(req, res) {
        
        res.sendFile(path.join(__dirname + '/frontend/scripts/maquetteScripts.js'));
    });
    
    

    app.use('/',async  function(req,res){
       
        res.render('index.html');
      });

    // start express server
    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results");

}).catch(error => console.log(error));
