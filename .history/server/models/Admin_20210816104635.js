module.exports = (sequelize, DataTypes) => {
    const Admins = sequelize.define('Admins', {
        userPseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
            },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Admins.associate = (models) => {

        Admins.hasMany(models.Likes, {
            onDelete:"cascade",
        })

        Admins.hasMany(models.Posts, {
            onDelete:"cascade",
        })
    }
    return Admins;
}