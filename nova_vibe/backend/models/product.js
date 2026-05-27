const { Sequelize } = require("sequelize")

module.exports=function(sequelize,DataTypes){

    return sequelize.define("product",{

        id_product: {

            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true

        },
        product_name:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        price:{
            type: DataTypes.DECIMAL(10,2),
            allowNull:false
        },
        id_category:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        in_stock:{
            type: DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue: true
        },
        registration_date:{

            type: DataTypes.DATE,
            allowNull:true,
            defaultValue: DataTypes.NOW
        }

    },

{
    tableName:"product",
    timestamps: false,
    indexes:[
        {
            name: "PRIMARY",
            unique:true,
            using:"BTREE",
            fields:[
                {name:"id_product"}
            ]
        },

        {name: "FK_CATEGORY",
            using:"BTREE",
            fields:[
                {name:"id_category"}
            ]
        }


    ]
})

}