import React from 'react'
import TableComponent from '../helper/tableComponent';
import { FaEdit, FaEye, FaTrash, FaPlus, FaList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGetCollectionSalesQuery, useSalesManDeleteMutation } from '@/Rtk/collectionApi';

const CollectionSales = () => {
    const { data, isLoading } = useGetCollectionSalesQuery()
    const [salesManDelete] = useSalesManDeleteMutation();

    const navigate = useNavigate()

    const columns = [
        { header: "Name", accessor: "name" },
        { header: "Email", accessor: "email" },
        { header: "Password", accessor: "password" },
        { header: "Action", accessor: "action", type: "action" }
    ];

    const tableData = data?.map((test) => ({
        name: test.name || "N/A",
        email: test.email || "N/A",
        password: test.password || "N/A",
        action: (
            <div className="flex gap-2 justify-center">
                <button
                    onClick={() => handleDelete(test._id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-all duration-200"
                    title="Delete"
                >
                    <FaTrash size={14} />
                </button>
            </div>
        ),
    })) || [];

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this salesman?");
        if (!confirmed) return;
        console.log(id)
        
        try {
            const res = await salesManDelete({ id }).unwrap();
            console.log("✅ Deleted successfully:", res);
        } catch (error) {
            console.error("❌ Delete failed:", error);
        }
    };

    return (
        <div className="p-2 max-w-full min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Home-Collection Sales
                    </h2>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <button
                            className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                            onClick={() => navigate("/dashboard/home-collection/order")}
                        >
                            <FaList size={14} />
                            <span className="whitespace-nowrap">View Orders</span>
                        </button>
                        
                        <button
                            className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-sm"
                            onClick={() => navigate("/dashboard/home-collection/add")}
                        >
                            <FaPlus size={14} />
                            <span className="whitespace-nowrap">Add Sales</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="flex items-center gap-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            <p className="text-gray-600 font-medium">Loading...</p>
                        </div>
                    </div>
                ) : (
                    <TableComponent 
                        title="Sales Personnel List" 
                        columns={columns} 
                        data={tableData} 
                        itemsPerPage={10} 
                    />
                )}
            </div>
        </div>
    )
}

export default CollectionSales