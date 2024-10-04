import { todos } from './todos.js'; 

export let categories = [
  { categoryID: 0, categoryName: 'Household' },
  { categoryID: 1, categoryName: 'Groceries' },
  { categoryID: 2, categoryName: 'Laundry' },
]; // Predefined categories for testing

// Function to add a new category
export function addCategory(name) {
    if (name) {
      // Check for duplicate category names
      if (!categories.some(cat => cat.categoryName.toLowerCase() === name.toLowerCase())) {
        // Add category if it's unique
        const newCategoryID = categories.length ? Math.max(...categories.map(cat => cat.categoryID)) + 1 : 0;
        categories.push({ categoryID: newCategoryID, categoryName: name });
        console.log(`Category "${name}" added successfully!`); // Feedback to the user
      } else {
        console.log(`Category "${name}" already exists!`); // Error handling
      }
    }
}



// Function to get all categories
export function getCategories() {
  return categories;
}

