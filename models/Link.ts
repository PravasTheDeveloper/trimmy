import { Schema, model, models } from 'mongoose'

const LinkSchema = new Schema({
  shortCode: { type: String, unique: true, required: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Link = models.Link || model('Link', LinkSchema)
export default Link
