
import React, { useState } from "react";
import Spinner from "../Loading/SpinLoading";
import { useAddCollectionSalesMutation } from "@/Rtk/collectionApi";

const AddCollectionSales = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [addCollectionSales] = useAddCollectionSalesMutation()

    const [spinLoading, setSpinLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        setSpinLoading(true)
        const response = await addCollectionSales({data:formData})
        if(response?.data){
              setFormData(
                {
                    name: "",
                    email: "",
                    password: ""
                }
              )
        }
        setSpinLoading(false)


    };

    return (
        <section className="min-h-[90vh] my-auto mt-20">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md my-auto">
                <h2 className="text-xl font-bold mb-4">Add Collection Sales</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    {spinLoading ? <Spinner /> :
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                        >
                            Submit
                        </button>
                    }
                </form>
            </div>
        </section>
    );
};

export default AddCollectionSales;