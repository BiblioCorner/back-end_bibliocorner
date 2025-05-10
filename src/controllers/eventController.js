import Event from "../models/event.js";

const eventController = {
  async createEvent(req, res) {
    try {
      const newEvent = new Event(req.body);
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la création de l'événement", error: error.message });
    }
  },

  async getAllEvents(req, res) {
    try {
      const events = await Event.find().populate('library_id');
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des événements", error: error.message });
    }
  },

  async getEventById(req, res) {
    try {
      const event = await Event.findById(req.params.id).populate('library_id');
      if (!event) return res.status(404).json({ message: "Événement non trouvé" });
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération de l'événement", error: error.message });
    }
  },

  async updateEvent(req, res) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEvent) return res.status(404).json({ message: "Événement non trouvé" });
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la mise à jour de l'événement", error: error.message });
    }
  },

  async deleteEvent(req, res) {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) return res.status(404).json({ message: "Événement non trouvé" });
      res.status(200).json({ message: "Événement supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression de l'événement", error: error.message });
    }
  },
};

export default eventController;
