module.exports = (sequelize, DataTypes) => {
    const CommentsSignalled = sequelize.define('CommentsSignalled');

    return CommentsSignalled;
}