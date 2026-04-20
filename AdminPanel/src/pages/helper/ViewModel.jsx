import React from "react";

const ViewModal = ({ data, closeModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-semibold">Test Details</h2>
                <p><strong>Name:</strong> {data.testDetailName}</p>
                <p><strong>Category:</strong> {data.category}</p>
                <p><strong>Price:</strong> ₹{data.testPrice}</p>
                
                <div className="flex justify-end gap-3 mt-4">
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded" 
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewModal;
