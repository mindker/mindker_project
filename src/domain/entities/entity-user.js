module.exports = (db) => {
  const userSchema = new db.Schema(
    {
      name: { type: String, required: true, trim: true },
      nickname: { type: String, required: true, unique: true, trim: true },
      email: { type: String, required: true, trim: true },
      password: { type: String, required: true, trim: true },
      avatar: { type: String },
      decks: { type: Array },
      role: { type: String, default: 'user' },
    },
    {
      timestamps: true,
    },
  );
  return db.model('Users', userSchema);
};
