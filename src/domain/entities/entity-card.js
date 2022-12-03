module.exports = (db) => {
  const cardSchema = new db.Schema(
    {
      question: { type: String, required: true, trim: true },
      questionFile: { type: String },
      answer: { type: String, required: true, trim: true },
      difficulty: [{ type: db.Schema.Types.ObjectId, ref: 'Difficulties' }],
      resources: [{ type: String }],
      idDeck: { type: db.Schema.Types.ObjectId, ref: 'Decks' },
    },
    {
      timestamps: true,
    },
  );
  return db.model('Cards', cardSchema);
};
