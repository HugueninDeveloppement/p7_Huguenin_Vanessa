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

    Comments.associate = (models) => {
        Comments.hasMany(models.CommentsSignalled, {
            onDelete:"set null",
        });
    }

    return Comments;
}