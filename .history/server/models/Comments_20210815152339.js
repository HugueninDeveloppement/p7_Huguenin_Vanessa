module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        commentText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userPseudo:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });

    return Comments;
}