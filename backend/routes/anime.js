import express from "express";
import Anime from "../models/Anime.js";

const router = express.Router();

router.post('/create', async (req, res) => {
    const { name, description, episodes, chapter, status, score, genres, aired, studio, author, type, coverURL } = req.body;
    const newAnime = new Anime({
        name,
        description,
        episodes,
        chapter,
        status,
        score,
        genres,
        studio,
        author,
        type,
        coverURL
    })
    try {
        const result = await newAnime.save();
        res.send(result);
    } catch (err) {
        res.send(err);
    }
}).get('/all', async(req, res) => {
    try {
        const result = await Anime.find();
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}).get('/byName', async(req,res) =>{
    const animeName = req.query.q;
    try {
        const result = await Anime.find({name: animeName});
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}).get('/:id', async(req,res) =>{
    const id = req.params.id;
    try {
        const result = await Anime.findById(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}).patch('/update/:id', async(req,res) =>{
    const id = req.params.id;
    const filter = {_id: id};

    const updates = req.body;

    try {
        const result = await Anime.findOneAndUpdate(filter, req.body, {new: true})
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}).delete('/delete/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const result = await Anime.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})


export default router;