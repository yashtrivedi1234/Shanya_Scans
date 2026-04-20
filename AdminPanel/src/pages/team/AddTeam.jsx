import { useAddTeamMutation, useEditTeamMutation } from "@/Rtk/teamApi";
import React, { useState } from "react";
import Spinner from "../Loading/SpinLoading";
import { useLocation } from "react-router-dom";

const AddTeam = () => {

    const location=useLocation()
    const {state}=location
    console.log(state);
    const [data, setdata] = useState({
        doctorName: state?.doctorName || "",
        doctorDesination: state?.doctorDesination || "",
        refService: state?.refService || "",
        experience: state?.experience || "",
        degree: state?.degree || "",
        isDoctor: state?.isDoctor || "true", // default value
        doctorPhoto: state?.doctorPhoto?.secure_url || null,
    });
    const [spinLoading, setSpinLoading] = useState(false)
    const [addTeam] = useAddTeamMutation()
    const [editTeam]=useEditTeamMutation()

 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata({
            ...data,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setdata({
            ...data,
            doctorPhoto: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinLoading(true)
        const formData = new FormData()
        formData.append("doctorName", data.doctorName)
        formData.append("doctorDesination", data.doctorDesination)
        formData.append("experience", data.experience)
        formData.append("degree", data.degree)
        formData.append("refService", data.refService)
        formData.append("doctorPhoto", data.doctorPhoto)
        formData.append("isDoctor", data.isDoctor)

        let response

        if(state){
             response = await editTeam({id:state._id,formData})
        }else{
            response = await addTeam(formData)
        }
 
        console.log(response);
        
        if(response?.data){
             setdata(
                {
                    doctorName: "",
                    doctorDesination: "",
                    refService: "",
                    experience: "",
                    degree: "",
                    isDoctor: "true", // default value
                    doctorPhoto: null,
                }
             )

        }
        setSpinLoading(false)
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">{state? "Edit Team Member" : "Add Team Member"}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Doctor Name</label>
                    <input
                        type="text"
                        name="doctorName"
                        value={data.doctorName}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                        placeholder="Enter doctor name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Designation</label>
                    <input
                        type="text"
                        name="doctorDesination"
                        value={data.doctorDesination}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                        placeholder="Enter designation"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Reference Service</label>
                    <input
                        type="text"
                        name="refService"
                        value={data.refService}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                        placeholder="Enter reference service"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Experience (Years)</label>
                    <input
                        type="text"
                        name="experience"
                        value={data.experience}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                        placeholder="Enter experience in years"
                 
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Degree</label>
                    <input
                        type="text"
                        name="degree"
                        value={data.degree}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                        placeholder="Enter degree"
                 
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Is Doctor</label>
                    <select
                        name="isDoctor"
                        value={data.isDoctor}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-600 font-medium mb-1">Doctor Photo</label>
                    <input
                        type="file"
                        name="doctorPhoto"
                        onChange={handleFileChange}
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                        accept="image/*"
                    />
                </div>
                <div className="col-span-2">
                    {spinLoading ? <Spinner /> :
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-semibold"
                        >
                            Submit
                        </button>
                    }
                </div>
            </form>
        </div>
    );
};

export default AddTeam;