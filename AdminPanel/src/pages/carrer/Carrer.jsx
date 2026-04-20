import { useDeleteCarrerMutation, useGetAllCarrerQuery } from '@/Rtk/carrerApi'
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';
import Swal from 'sweetalert2';

const Carrer = () => {
  
       const { data, isLoading } = useGetAllCarrerQuery()
       const [deleteCarrer]=useDeleteCarrerMutation()


       console.log(data);
       

   

       const columns = [
        { header: "Name", accessor: "name" },
        { header: "cv", accessor: "cv" },
        { header: "Email", accessor: "email" },
        { header: "Position", accessor: "position" },
        { header: "Action", accessor: "action", type: "action" }
    ];

        const tableData = data?.map((test) => ({
            name: test?.name
                || "N/A",
            // url: test.url || "N/A",
            cv: test.resume ? (
                <img
                    src={test.resume.secure_url}
                    alt="Resume"
                    className="w-16 h-16 object-cover rounded-md border border-gray-300"
                />
            ) : (
                "N/A"
            ),
            email:test?.email || "N/A",
            position:test?.position || "N/A",
            action: (
                <div className="flex gap-3">
                    <button
                       onClick={()=>handleCarrer(test?._id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <FaTrash size={18} />
                    </button>
                </div>
            ),
        })) || [];


         const handleCarrer = async (id) => {
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
                       const response = await deleteCarrer(id).unwrap(); // Await the mutation
       
       
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
       

  return (
    <div className='p-2 max-w-full min-h-screen bg-gray-50'>
        {tableData.length == 0 ? (
            <h2 className="text-xl text-center mt-10 font-semibold text-gray-800 mb-4">
               No Application found
            </h2>
        ):
        ( <TableComponent title="Carrer  List" columns={columns} data={tableData} itemsPerPage={10} />)
    }
    </div>
  )
}

export default Carrer