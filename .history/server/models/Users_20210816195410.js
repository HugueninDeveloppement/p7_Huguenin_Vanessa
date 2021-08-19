module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
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
        },
        userRole: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    Users.associate = (models) => {

        Users.hasMany(models.Likes, {
            onDelete:"cascade",
        });

        Users.hasMany(models.Posts, {
            onDelete:"cascade",
        });

        Users.hasMany(models.PostsSignalled, {
            onDelete:"set null",
        });

        Users.hasMany(models.CommentsSignalled, {
            onDelete:"set null",
        });
        


    }
    return Users;
}