module.exports = (db) => {
  const cardSchema = new db.Schema(
    {
      question: { type: String, required: true, trim: true },
      questionFile: { type: String },
      answer: { type: String, required: true, trim: true },
      difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Hard' },
    },
    {
      timestamps: true,
    },
  );
  return db.model('Cards', cardSchema);
};
