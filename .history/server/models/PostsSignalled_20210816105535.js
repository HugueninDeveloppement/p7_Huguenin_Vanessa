module.exports = (sequelize, DataTypes) => {
    const PostsSignalled = sequelize.define('PostsSignalled');

    return PostsSignalled;
}