module.exports = (db) => {
  const deckSchema = new db.Schema(
    {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      image: { type: String },
      cards: [{ type: db.Schema.Types.ObjectId, ref: 'Cards' }],
      isOpen: { type: Boolean },
      likes: [{ type: db.Schema.Types.ObjectId, ref: 'Users' }],
      tags: [{ type: String }],
    },
    {
      timestamps: true,
    },
  );
  return db.model('Decks', deckSchema);
};
