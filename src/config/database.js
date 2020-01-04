module.exports = {
  dialect: 'postgres',
  host:'localhost',
  port:5432,
  username:'postgres',
  password:'postgresdocker',
  database: 'interactio',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};