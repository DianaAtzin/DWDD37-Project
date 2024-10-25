import { todos } from './todos.js'; 

export let categories = [
  { categoryID: 0, categoryName: 'Household' },
  { categoryID: 1, categoryName: 'Groceries' },
  { categoryID: 2, categoryName: 'Laundry' },
]; 

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
        console.log(`Category "${name}" already exists!`);
      }
    }
}

// Function to edit an existing category
export function editCategory(index, newName) {
  if (newName && categories[index]) {
    // Check for duplicate category names while editing
    if (!categories.some(cat => cat.categoryName.toLowerCase() === newName.toLowerCase())) {
      categories[index].categoryName = newName.trim();
      console.log(`Category updated to "${newName}".`); // Feedback to the user
    } else {
      console.log(`Category "${newName}" already exists!`); 
    }
  } else {
    console.log('Invalid category index or name.'); // Error handling
  }
}

// Function to delete a category
export function deleteCategory(index) {
  if (categories[index]) {
    const categoryIDToDelete = categories[index].categoryID;

    // Remove or update todos that belong to this category
    todos.forEach(todo => {
      if (todo.categoryID === categoryIDToDelete) {
        todo.categoryID = null; 
      }
    });

    categories.splice(index, 1); // Remove the category
    console.log(`Category "${index}" deleted successfully!`); // Feedback to the user
  } else {
    console.log('Invalid category index.'); // Error handling
  }
}

// Function to get all categories
export function getCategories() {
  return categories;
}

