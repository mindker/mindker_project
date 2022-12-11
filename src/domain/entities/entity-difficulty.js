module.exports = (db) => {
  const difficultySchema = new db.Schema(
    {
      idCard: { type: db.Schema.Types.ObjectId, ref: 'Cards', required: true },
      idUser: { type: db.Schema.Types.ObjectId, ref: 'Users', required: true },
      level: { type: String, required: true }, // [enum_Difficulty]
    },
    {
      timestamps: true,
    },
  );
  return db.model('Difficulties', difficultySchema);
};
