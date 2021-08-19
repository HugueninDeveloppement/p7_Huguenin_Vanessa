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

    return Admins;
}