const { Sequelize } = require("sequelize")

module.exports=function(sequelize,DataTypes){

    return sequelize.define("category",{

        id_category: {

            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true

        },
        category_name:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        description:{
            type: DataTypes.STRING(255),
            allowNull:true
        },
        creation_date:{
            type: DataTypes.DATE,
            allowNull:true,
            defaultValue: DataTypes.NOW
        },
        like_count:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        seasonal_product_available:{

            type: DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue: false
        }

    },

{
    tableName:"category",
    timestamps: false,
    indexes:[
        {
            name: "PRIMARY",
            unique:true,
            using:"BTREE",
            fields:[
                {name:"id_category"}
            ]
        }
    ]
})

}