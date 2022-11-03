//run npm install --save-dev mongoose/mongoose-slug-plugin first
//run mongosh

import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

// TODO: add schemas
const PokemonSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name:{type: String, required: true},
    pId:{type:Number, required:true}
})

const ListSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title:{type: String, required: true},
    pokemons:{type:[PokemonSchema], unique:false}, 
    //Array of Pokemon objects
    description:{type: String, required:false},
});

const UserSchema = new mongoose.Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true, unique:true},
    password:{type: String, unique: true, required:true},
    //Add unique:false to make sure this variable is not used as unique index and can be equal.
    untitledList:{type:Number},
    list:{type:[ListSchema], unique:false}
});

// TODO: configure plugin
//UserSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=username%>'});
ListSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=_id%>'});
PokemonSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=name%>'});

//this plugin will autogenerate a slug field (no need to explicitly add it to your schema)
//a slug is a string that serves as a short, human readable name
//usually contains dashes to separate words, and a number suffix

// TODO: register models
mongoose.model('User', UserSchema);
mongoose.model('List', ListSchema);
mongoose.model('Pokemon', PokemonSchema);

mongoose.connect('mongodb://localhost/final_project');