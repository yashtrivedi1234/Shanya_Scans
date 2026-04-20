import { useDeleteDoctorMutation, useGetAllTeamQuery } from '@/Rtk/teamApi';
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { io } from "socket.io-client";

const Team = () => {
    const { data, isLoading,refetch } = useGetAllTeamQuery();
    const navigate = useNavigate()
    const [deleteTeam] = useDeleteDoctorMutation()
    const filterDoctor = Array.isArray(data) && data.filter((data) => data.isDoctor == true)
    const filterNotDoctor = Array.isArray(data) && data.filter((data) => !data.isDoctor)
    const combinedArray = Array.isArray(filterDoctor) && Array.isArray(filterNotDoctor) && [...filterDoctor, ...filterNotDoctor];
    const [searchTerm, setSearchTerm] = useState("");
     const socket = io("https://db.shanyascans.com");
      

     const filteredData = Array.isArray(combinedArray) && combinedArray?.filter((item) =>
        item.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const columns = [
        { header: "Doctor Name", accessor: "name" },
        { header: "Photo", accessor: "photo" },
        { header: "Degree", accessor: "degree" },
        { header: "Destination", accessor: "destination" },
        { header: "Action", accessor: "action", type: "action" }
    ];

    const tableData = Array.isArray(filteredData) && filteredData?.map((test) => ({
        name: test.doctorName || "N/A",
        // url: test.url || "N/A",
        photo: test.doctorPhoto ? (
            <img
                src={test.doctorPhoto.secure_url}
                alt="Banner"
                className="w-16 h-16 object-cover rounded-md border border-gray-300"
            />
        ) : (
            "N/A"
        ),
        photo: test.doctorPhoto ? (
            <img
                src={test.doctorPhoto.secure_url}
                alt="Banner"
                className="w-16 h-16 object-cover rounded-md border border-gray-300"
            />
        ) : (
            "N/A"
        ),
        degree: test.degree || "N/A",
        destination: test.doctorDesination,
        action: (
            <div className="flex gap-3">
                <button
                     onClick={() => handleEdit(test)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <FaEdit size={18} />
                </button>
                <button
                    onClick={() => handleDelete(test._id)}
                    className="text-red-600 hover:text-red-800"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        ),
    })) || [];


    // const handleDelete=async(id)=>{
    //      const response=await deleteTeam(id)
    // }

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
            });

            if (result?.isConfirmed) {
                const response = await deleteTeam(id)


                if (response?.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            }
        } catch (error) {
            console.error("Error deleting:", error);
        }

    }

    const handleTeam = async () => {
        console.log("mai aaya hu");
        await refetch();
    };

    const handleEdit=async(data)=>{
       navigate("/dashboard/team/add",{state:data})    
    }

      useEffect(() => {
        socket.on("ham-aa-gaye", () => {
          console.log("mai pagal ho gaya hu ");
          handleTeam()
        });
    
        return () => {
          socket.off("ham-aa-gaye")
        };
      }, []);

      

      


    return (
        <div>
            <div className="flex items-center justify-between mb-4 pt-4">
                <h2 className="text-2xl font-semibold text-black">{"Team List"}</h2>
                <button
                    className="bg-yellow text-gray-800  px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"

                    onClick={() => navigate("/dashboard/team/add")}
                >
                    + Add Team
                </button>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Doctor Name..."
                    className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <TableComponent title="Team List" columns={columns} data={tableData} itemsPerPage={10} />
            )}

        </div>
    )
}

export default Team