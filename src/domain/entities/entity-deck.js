module.exports = (db) => {
  const deckSchema = new db.Schema(
    {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      image: { type: String },
      cards: [{ type: db.Schema.Types.ObjectId, ref: 'Cards' }],
      isOpen: { type: Boolean, required: true },
      author: { type: db.Schema.Types.ObjectId, ref: 'Users' },
      likes: { type: Number, default: 0 },
      tags: [{ type: String }],
    },
    {
      timestamps: true,
    },
  );
  return db.model('Decks', deckSchema);
};
