import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
    name: {type: String, required: true, set: a => a === '' ? undefined : a},
    description: {type: String, set: b => b === '' ? undefined : b},
    episodes: {type: Number, required: function(){return !this.chapter}, set: c => c === '' ? undefined : c},
    chapter: {type: Number, required: function(){return !this.episodes}, set: d => d === '' ? undefined : d},
    status: {type: String, default: 'Select', enum: ['Plan to Watch', 'Watching', 'Completed'], required: true, set: e => e === '' ? undefined : e},
    score: {type: String, default: 'Select', enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], set: f => f === '' ? undefined : f},
    genres: {type: [String], set: g => g === '' ? undefined : g},
    studio: {type: String, required: function(){return !this.author}, set: h => h === '' ? undefined : h},
    author: {type: String, required: function(){return !this.studio}, set: i => i === '' ? undefined : i},
    type: {type: String, set: j => j === '' ? undefined : j},
    coverURL: {type: String, set: k => k === '' ? undefined : k},
});

const Anime = new mongoose.model('Anime', animeSchema);

export default Anime;