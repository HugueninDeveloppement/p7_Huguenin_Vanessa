module.exports = (sequelize, DataTypes) => {
    const Admins = sequelize.define('Admins', {
        adminPseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
            },
        adminName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adminEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        adminPassword: {
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