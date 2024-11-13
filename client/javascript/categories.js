// In-memory data for categories (this will be replaced with data from the backend)
export let categories = [
  { categoryID: 0, categoryName: 'Household' },
  { categoryID: 1, categoryName: 'Groceries' },
  { categoryID: 2, categoryName: 'Laundry' },
];

// Function to fetch all categories from the API
export const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/categories');
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Function to add a new category via the API
export const addCategory = async (name) => {
  if (name) {
    try {
      const newCategory = { categoryName: name };
      const response = await fetch('http://localhost:3000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });
      const addedCategory = await response.json();
      console.log(`Category "${name}" added successfully!`);
      return addedCategory;
    } catch (error) {
      console.error('Error adding category:', error);
    }
  }
};

// Function to edit an existing category via the API
export const editCategory = async (categoryID, newName) => {
  if (newName) {
    try {
      const updatedCategory = { categoryName: newName };
      const response = await fetch(`http://localhost:3000/api/categories/${categoryID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategory),
      });
      const updatedData = await response.json();
      console.log(`Category updated to "${newName}".`);
      return updatedData;
    } catch (error) {
      console.error('Error updating category:', error);
    }
  }
};

// Function to delete a category via the API
export const deleteCategory = async (categoryID) => {
  try {
    await fetch(`http://localhost:3000/api/categories/${categoryID}`, { method: 'DELETE' });
    console.log(`Category "${categoryID}" deleted successfully!`);
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};
