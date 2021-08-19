module.exports = (sequelize, DataTypes) => {
    const PostsSignalled = sequelize.define('PostsSignalled');

    PostsSignalled.associate = (models) => {

        PostsSignalled.hasMany(models.Posts, {
            onDelete:"set null",
        });
       

    }

    return PostsSignalled;
}