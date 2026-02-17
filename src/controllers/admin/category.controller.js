// Import du modèle Category pour interagir avec la collection "categories" dans MongoDB
import Category from "../../models/category.model.js";


const createCategory = async (req, res) => {
    try {
        // Récupération des données envoyées par le client
        const { name, status } = req.body;

        // Validation : si name ou status sont vides, renvoyer une erreur
        if ([name, status].some(field => field.trim() === "")) {
            return res.status(400).json({ 
                success: false,
                message: "Name and status are required",
                data: {}
            });
        }

        // Création de la catégorie dans MongoDB
        const category = await Category.create({ name, status });

        // Réponse HTTP 201 = créé avec succès
        return res.status(201).json({ 
            success: true,
            message: "Category created successfully",
            data: { category }
        });
        
    } catch (error) {
        // Gestion des erreurs serveur
        return res.status(500).json({ 
            success: false,
            message: error.message || "something went wrong while creating category",
            data: {}
        });
    }
}



const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        // Validation propre
        if (!name || !status || name.trim() === "" || status.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name and status are required",
                data: {}
            });
        }

        //Mise à jour directe + retour du document mis à jour
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, status },
            { new: true } // 👈 retourne la version mise à jour
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
                data: {}
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: { category: updatedCategory }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "something went wrong while updating category",
            data: {}
        });
    }
};



const getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Recherche de la catégorie
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ 
                success: false,
                message: "Category not found",
                data: {}
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Category fetched successfully",
            data: { category }
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: error.message || "something went wrong while fetching category",
            data: {}
        });
    }
}


const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérification que la catégorie existe
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ 
                success: false,
                message: "Category not found",
                data: {}
            });
        }

        // Suppression
        await category.deleteOne({ _id: id }); // attention, on pourrait juste faire deleteOne() ou findByIdAndDelete

        return res.status(200).json({ 
            success: true,
            message: "Category deleted successfully",
            data: {}
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: error.message || "something went wrong while deleting category",
            data: {}
        });
    }
}


const getAllCategories = async (req, res) => {
    try {
        // Récupère toutes les catégories
        const categories = await Category.find({});

        return res.status(200).json({ 
            success: true,
            message: "Categories fetched successfully",
            data: { categories }
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: error.message || "something went wrong while fetching categories",
            data: {}
        });
    }
}


export {
    createCategory,
    updateCategory,
    getCategory,
    deleteCategory,
    getAllCategories
}