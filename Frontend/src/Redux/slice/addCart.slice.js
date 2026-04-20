import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'sonner';

const initialState = {
  cartData: JSON.parse(localStorage.getItem("cartData")) || [], // Items in the cart
  numberOfCart: JSON.parse(localStorage.getItem("numberOfCart")) || 0, // Total number of items
  isOpen: false, // Track whether the cart is open or closed
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload; // Incoming full product data
      const { packageName, packageRate, testName, testPrice, testDetailName } = item;
    
      // Log the incoming item for debugging
      console.log("item is", item);
    
      // Determine whether it's a package or a test based on the available properties
      const isPackage = packageName && packageRate;
      const isTest = (testName || testDetailName) && testPrice;
    
      // Create a unique identifier for each item
      const itemIdentifier = isPackage
        ? packageName
        : isTest
        ? testName || testDetailName
        : null;
    
      if (!itemIdentifier) {
        console.error("Item does not have valid package or test data");
        return;
      }

      console.log("slice is",itemIdentifier);
      
    
      // Check if the item already exists in the cart
      const existingItem = state.cartData.find(
        (cartItem) =>
          cartItem.packageName === itemIdentifier ||
          cartItem.testName === itemIdentifier ||
          cartItem.testDetailName === itemIdentifier
      );
    
      if (existingItem) {
        // If the item is already in the cart, increase its quantity
        existingItem.quantity += 1;
      } else {
        // Add new item with quantity 1
        if (isPackage) {
          state.cartData.push({ packageName, packageRate, quantity: 1,orderType: "package", });
        } else if (isTest) {
          state.cartData.push({
            testName: testName || testDetailName, // Use testDetailName if testName is not present
            testPrice,
            quantity: 1,
            orderType: "scan",
          });
        }
        console.log(state.cartData);
        
      }
    
      // Update the total number of items (based on quantity)
      state.numberOfCart = state.cartData.reduce(
        (total, item) => total + item.quantity,
        0
      );
    
      // Sync with localStorage
      localStorage.setItem("cartData", JSON.stringify(state.cartData));
      localStorage.setItem("numberOfCart", JSON.stringify(state.numberOfCart));
    
      // Optional: Show success message
      const itemName = isPackage ? packageName : testName || testDetailName;
      toast.success(`${itemName} added to cart!`);
    },
    
    
    removeFromCart(state, action) {
      const itemId = action.payload; // payload will be the unique ID of the test (_id) or package (packageName)
    
      // Find the specific item in the cart
      const existingItem = state.cartData.find(
        (cartItem) => cartItem.testName=== itemId || cartItem.packageName === itemId
      );
    
      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Decrease quantity if it's more than 1
          existingItem.quantity -= 1;
        } else {
          // Remove the item completely if quantity is 1
          state.cartData = state.cartData.filter(
            (cartItem) => cartItem.testName!== itemId && cartItem.packageName !== itemId
          );
        }
    
        // Update total number of items (based on quantity)
        state.numberOfCart = state.cartData.reduce((total, item) => total + item.quantity, 0);
    
        // Sync with localStorage
        localStorage.setItem("cartData", JSON.stringify(state.cartData));
        localStorage.setItem("numberOfCart", JSON.stringify(state.numberOfCart));
      }
    },
    
    
    
    clearCart(state) {
      // Reset the cart
      state.cartData = [];
      state.numberOfCart = 0;
    
      // Sync with localStorage
      localStorage.setItem("cartData", JSON.stringify([]));
      localStorage.setItem("numberOfCart", JSON.stringify(0));
    },
    
    toggleCart(state) {
      // Toggle the cart's visibility
      state.isOpen = !state.isOpen;
    }
    
    
  },
});

export const { addToCart, removeFromCart, clearCart,toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
