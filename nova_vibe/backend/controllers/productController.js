const Respuesta= require("../utils/respuesta");

const {logMensaje} = require("../utils/logger.js");

const initModels=require("../models/init-models.js").initModels;

const sequelize=require("../config/squelize.js");

const models=initModels(sequelize);

const Producto= models.product;

const Category= models.category;

class productController{
    async createProduct(req, res){

        const producto= req.body;

        try {

            const newProduct= await Producto.create(producto);
            res.status(201).json(Respuesta.exito(newProduct,"producto insertado"))

        }catch (err){
            logMensaje("Error :"+err);
            res.status(500).json(Respuesta.error(null,"Error al crear el producto"))
        }

    }

    async getProductById(req, res){
    
            const id_product=req.params.id_product;
    
            try {
    
                const data= await Producto.findByPk(id_product);
                if(!data){
                    res.status(404).json(Respuesta.error(null, "Producto inexistente"));
                }else{
                res.json(Respuesta.exito(data,"Se recupero el Producto"));
            }
    
            }catch (err){
                logMensaje("Error: "+err)
                res.status(500).json(Respuesta.error(null, "No se pudieron recuperar los Productos"))
            }
    
        }

    async getAllProducts(req, res){

        try {

            const data= await Producto.findAll({
                include:[
                    {
                        model: Category,
                        as: "idcategory_category",
                        attributes: [
                            "category_name"
                        ]
                    }
                ]
            });
            res.json(Respuesta.exito(data,"Se recuperaron todos los productos"));

        }catch (err){
            logMensaje("Error: "+err)
            res.status(500).json(Respuesta.error(null, "No se pudieron recuperar los productos"))
        }

    }

    async deleteProduct(req, res){

        const id_product=req.params.id_product;

        try {

            const numFilas= await Producto.destroy({
                where: {
                    id_product: id_product
                }
            });

            if (numFilas== 0){

                res.status(404).json(Respuesta.error(null,"No se encontro el producto del id: "+id_product));
            }else{

                res.status(204).send();
            }


        }catch (err){
            logMensaje("Error: "+err)
            res.status(500).json(Respuesta.error(null, "No se pudieron recuperar los productos"))
        }

    }

    async updateProduct(req, res){

        const producto= req.body;
        const id_product= req.params.id_product;

        if (id_product!= producto.id_product){
            return res.status(400).json(Respuesta.error(null,"No existe el id: "+id_product))
        }

        try {

            const numFilas= await Producto.update({...producto},{where:{id_product}});

            if (numFilas == 0) {

                res.status(404).json(Respuesta.error(null, "No se pudo modificar el producto con el id: " + id_product));
            }else{

                res.status(204).send();

            }


        }catch (err){
            logMensaje("Error: "+err)
            res.status(500).json(Respuesta.error(null, "No se pudieron actualizar los productos"))
        }

    }
}
module.exports=new productController()