import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, toggleCart } from "../../Redux/slice/addCart.slice";

const SidebarCart = () => {
  const dispatch = useDispatch();

  // Get cart data from Redux
  const { cartData, numberOfCart, isOpen } = useSelector((state) => state.cart);


  

  useEffect(() => {
    // Sync Redux cart state with localStorage
    localStorage.setItem("cartData", JSON.stringify(cartData));
    localStorage.setItem("numberOfCart", JSON.stringify(numberOfCart));
  }, [cartData, numberOfCart]);

  const toggleCartSidebar = () => {
    dispatch(toggleCart());
  };

  // Handle item removal from the cart (Redux action)
  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id)); // Assuming each item has a unique id
  };

  const calculateTotal = () => {
    return cartData.reduce(
      (total, item) => total + (item.packageRate || item.testPrice) * item.quantity,
      0
    );
  };

  console.log("ayush");

  console.log(cartData);
  
  

  return (
    <div>
      {/* View Cart Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700"
        onClick={toggleCartSidebar}
      >
         ({numberOfCart})
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg w-96 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 border border-red-500`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-semibold">My Cart</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={toggleCartSidebar}
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartData.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              cartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    {/* Conditionally render based on package or test */}
                    {item.packageName ? (
                      <p className="font-semibold">{item.packageName}</p>
                    ) : (
                      <p className="font-semibold">{item.testName || item.testDetailName}</p>
                    )}

                    {/* Display price */}
                    <p className="text-gray-600">
                      ₹{item.packageRate || item.testPrice}
                    </p>

                    {/* Display quantity */}
                    <p className="text-gray-600">Quantity: {item.quantity}</p>

                    {/* Additional details for tests */}
                    {item.testDetailName && (
                      <p className="text-gray-600">Test: {item.testDetailName}</p>
                    )}
                    {item.testDetails2 && (
                      <p className="text-gray-600">Additional Info: {item.testDetails2}</p>
                    )}
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItemFromCart(item.testId || item.packageName)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <p className="text-lg font-semibold">
              Total: ₹{calculateTotal()}
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarCart;
