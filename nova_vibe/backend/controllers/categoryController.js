const Respuesta= require("../utils/respuesta");

const {logMensaje} = require("../utils/logger.js");

const initModels=require("../models/init-models.js").initModels;

const sequelize=require("../config/squelize.js");

const models=initModels(sequelize);

const Categoria= models.category;

class categoryController{
    async createCategory(req, res){

        const categoria= req.body;

        try {

            const newCategory= await Categoria.create(categoria);
            res.status(201).json(Respuesta.exito(newCategory,"Categoria insertada"))

        }catch (err){
            logMensaje("Error :"+err);
            res.status(500).json(Respuesta.error(null,"Error al crear la categoria"))
        }

    }

    async getCategoryById(req, res){

        const id_category=req.params.id_category;

        try {

            const data= await Categoria.findByPk(id_category);
            if(!data){
                res.status(404).json(Respuesta.error(null, "Categoria inexistente"));
            }else{
            res.json(Respuesta.exito(data,"Se recupero la categoria"));
        }

        }catch (err){
            logMensaje("Error: "+err)
            res.status(500).json(Respuesta.error(null, "No se pudieron recuperar las categorias"))
        }

    }

    async getAllCategories(req, res){

        try {

            const data= await Categoria.findAll();
            res.json(Respuesta.exito(data,"Se recuperaron todas las categorias"));

        }catch (err){
            logMensaje("Error: "+err)
            res.status(500).json(Respuesta.error(null, "No se pudieron recuperar las categorias"))
        }

    }

    async deleteCategory(req, res){

        const id_category=req.params.id_category;

        try {

            const numFilas= await Categoria.destroy({
                where: {
                    id_category: id_category
                }
            });

            if (numFilas== 0){

                res.status(404).json(Respuesta.error(null,"No se encontro la categoria del id: "+id_category));
            }else{

                res.status(204).send();
            }


        }catch (err){
            logMensaje("Error: "+err)
            res.status(500).json(Respuesta.error(null, "No se pudieron recuperar las categorias"))
        }

    }

    async updateCategory(req, res){

        const categoria= req.body;
        const id_category= req.params.id_category;

        if (id_category!= categoria.id_category){
            return res.status(400).json(Respuesta.error(null,"No existe el id: "+id_category))
        }

        try {

            const numFilas= await Categoria.update({...categoria},{where:{id_category}});

            if (numFilas == 0) {

                res.status(404).json(Respuesta.error(null, "No se pudo modificar la categoria con el id: " + id_category));
            }else{

                res.status(204).send();

            }


        }catch (err){
            logMensaje("Error: "+err)
            res.status(500).json(Respuesta.error(null, "No se pudieron actualizar las categorias"))
        }

    }
}
module.exports=new categoryController()