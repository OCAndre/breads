"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// const express = require('express')
var breads = express.Router();
// const Bread = require('../models/bread.js')
var breadSeedData = require('../models/seed.js');
// const Baker = require('../models/baker.js')
// INDEX
breads.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foundBakers, foundBreads;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Baker.find().lean()];
            case 1:
                foundBakers = _a.sent();
                return [4 /*yield*/, Bread.find().limit(5).lean()];
            case 2:
                foundBreads = _a.sent();
                res.render('index', {
                    breads: foundBreads,
                    bakers: foundBakers,
                    title: 'Index Page'
                });
                return [2 /*return*/];
        }
    });
}); });
// NEW
breads.get('/new', function (req, res) {
    Baker.find()
        .then(function (foundBakers) {
        res.render('new', {
            bakers: foundBakers
        });
    });
});
// EDIT
breads.get('/:id/edit', function (req, res) {
    Baker.find()
        .then(function (foundBakers) {
        Bread.findById(req.params.id)
            .then(function (foundBread) {
            res.render('edit', {
                bread: foundBread,
                bakers: foundBakers
            });
        });
    });
});
// SHOW
breads.get('/:id', function (req, res) {
    Bread.findById(req.params.id)
        .populate('baker')
        .then(function (foundBread) {
        res.render('show', {
            bread: foundBread
        });
    })
        .catch(function (err) {
        res.send('404');
    });
});
// breads.get('/:arrayIndex', (req, res) => {
//     if (Bread[req.params.arrayIndex]) {
//         res.render('Show', {
//             bread: Bread[req.params.arrayIndex],
//             index: req.params.arrayIndex,
//         })
//     } else {
//         res.render('404')
//     }
// })
// CREATE
breads.post('/', function (req, res) {
    if (!req.body.image) {
        req.body.image = undefined;
    }
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true;
    }
    else {
        req.body.hasGluten = false;
    }
    Bread.create(req.body);
    res.redirect('/breads');
});
// breads.post('/', (req, res) => {
//     if (!req.body.image) {
//         req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
//     }
//     if (req.body.hasGluten === 'on') {
//         req.body.hasGluten = true
//     } else {
//         req.body.hasGluten = false
//     }
//     Bread.push(req.body)
//     res.redirect('/breads')
// })
// DELETE
breads.delete('/:id', function (req, res) {
    Bread.findByIdAndDelete(req.params.id)
        .then(function (deletedBread) {
        res.status(303).redirect('/breads');
    });
});
// UPDATE
breads.put('/:id', function (req, res) {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true;
    }
    else {
        req.body.hasGluten = false;
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(function (updatedBread) {
        console.log(updatedBread);
        res.redirect("/breads/".concat(req.params.id));
    });
});
// Seed
breads.get('/data/seed', function (req, res) {
    Bread.insertMany(breadSeedData)
        .then(function (createdBreads) {
        res.redirect('/breads');
    });
});
module.exports = breads;
