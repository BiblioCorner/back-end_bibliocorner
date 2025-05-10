import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true,  
  },
  date: {
    type: Date,
    required: true, 
  },
  start_time: {
    type: Date,
    required: true,  
  },
  end_time: {
    type: Date,
    required: true, 
  },
  library_id: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Library',  
    required: true,
  },
  address: {
    type: String,
    required: true,  
  },
  register_link: {
    type: String,
    required: true,  
   // match: [/^https?:\/\/[a-zA-Z0-9-_.]+(?:\.[a-zA-Z0-9-]+)+$/, 'Veuillez fournir un lien valide pour l\'inscription.'],
  },
})

// const Event = mongoose.model('Event', eventSchema);
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;