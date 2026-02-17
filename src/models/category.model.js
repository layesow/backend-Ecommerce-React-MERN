// On importe mongoose et l'objet Schema depuis mongoose
import mongoose, { Schema } from "mongoose";

// Définition du schéma pour la collection "Category"
const categorySchema = Schema({
  // Champ "name" obligatoire de type String
  name: {
    type: String,
    required: true, // le nom est obligatoire
  },
  // Champ "status" avec des valeurs limitées et une valeur par défaut
  status: {
    type: String,
    enum: ["active", "block"], // la valeur doit être "active" ou "block"
    default: "active",         // si rien n'est fourni, la valeur sera "active"
  },
}, { 
  timestamps: true // mongoose crée automatiquement "createdAt" et "updatedAt"
});

// Création du modèle "Category" à partir du schéma
// Le modèle est utilisé pour interagir avec la collection "categories" dans MongoDB
const Category = mongoose.model("Category", categorySchema);

// Export du modèle pour pouvoir l'utiliser dans d'autres fichiers
export default Category;
