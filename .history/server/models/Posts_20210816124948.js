module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            length:800
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userPseudo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete:"cascade",
        });

        Posts.hasMany(models.Likes, {
            onDelete:"cascade",
        });

        Posts.hasMany(models.PostsSignalled, {
            onDelete:"set null",
        });
    }
    return Posts;
}