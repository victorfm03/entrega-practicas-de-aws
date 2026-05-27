var DataTypes=require("sequelize").DataTypes;

const { FOREIGNKEYS } = require("sequelize/lib/query-types");
var _category=require("./category");

var _product=require("./product");

function initModels(sequelize){

    var category=_category(sequelize,DataTypes);

    var product=_product(sequelize,DataTypes);


    product.belongsTo(category,{as: "idcategory_category",foreignKey: "id_category"})

    category.hasMany(product,{as: "products",foreignKey: "id_category"})

    return {category,product}

}

module.exports=initModels;

module.exports.initModels=initModels;

module.exports.default=initModels;