import { useAddCarrerOpeningMutation, useEditCarrerOpeningMutation } from "@/Rtk/galleryApi";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const AddJobOpening = () => {
    const [step, setStep] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

   
    
    const [formData, setFormData] = useState({
        jobTitle: state?.jobTitle || "",
        jobCategory: state?.jobCategory || "",
        location: state?.location || "",
        salary: state?.salary || "",
        experienceRequired: state?.experienceRequired || "",
        jobType: state?.jobType || "",
        skills: state?.skills || "",
        benefits: state?.benefits || "",
        deadline: state?.deadline || "",
        jobDescription: state?.jobDescription || "",
        responsibilities: state?.responsibilities || "",
        qualifications: state?.qualifications || ""
    });

    const [jobDescriptionContent, setJobDescriptionContent] = useState(state?.jobDescription || "");
    const [responsibilitiesContent, setResponsibilitiesContent] = useState(state?.responsibilities || "");
    const [qualificationsContent, setQualificationsContent] = useState(state?.qualifications || "");

    const [addCarrerOpening]=useAddCarrerOpeningMutation()

    const [editCarrerOpening]=useEditCarrerOpeningMutation()
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        // Update formData with editor contents
        const updatedFormData = {
            ...formData,
            jobDescription: jobDescriptionContent,
            responsibilities: responsibilitiesContent,
            qualifications: qualificationsContent
        };


        
        
        let response;
        
        if (state?._id) {
            response = await editCarrerOpening({data:updatedFormData,id:state?._id})
        } else {
            response = await addCarrerOpening({data:updatedFormData});
        }

      
            // Reset form
            setFormData({
                jobTitle: "",
                jobCategory: "",
                location: "",
                salary: "",
                experienceRequired: "",
                jobType: "",
                skills: "",
                benefits: "",
                jobDescription: "",
                responsibilities: "",
                qualifications: ""
            });
            
            setJobDescriptionContent("");
            setResponsibilitiesContent("");
            setQualificationsContent("");
            setStep(1);
  
   
        
    };

    const editorOptions = {
        minHeight: "200px",
        maxHeight: "400px",
        buttonList: [
            ["undo", "redo"],
            ["bold", "underline", "italic", "strike"],
            ["font", "fontSize", "formatBlock"],
            ["fontColor", "hiliteColor"],
            ["align", "list", "lineHeight"],
            ["table"],
            ["link"],
            ["image"],
            ["codeView"],
        ],
        linkProtocol: "",
        addTagsWhitelist: "a[href]",
        sanitize: false,
        defaultTag: "div",
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
                {state?._id ? "Edit Job Opening" : "Add New Job Opening"}
            </h1>
            
            {step === 1 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Basic Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Job Title (Full Width) */}
                        <div className="md:col-span-2">
                            <label className="block font-medium mb-1">Job Title*</label>
                            <input
                                type="text"
                                name="jobTitle"
                                placeholder="Enter job title"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* 2-Column Inputs */}
                        <div>
                            <label className="block font-medium mb-1">Job Category*</label>
                            <select
                                name="jobCategory"
                                value={formData.jobCategory}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Nursing">Nursing</option>
                                <option value="Paramedics">Paramedics</option>
                                <option value="Academic Staff">Academic Staff</option>
                              
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Location*</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter job location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Additional Inputs */}
                        <div>
                            <label className="block font-medium mb-1">Job Type</label>
                            <select
                                name="jobType"
                                value={formData.jobType}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Job Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Experience Required</label>
                            <input
                                type="text"
                                name="experienceRequired"
                                placeholder="e.g., 3-5 years"
                                value={formData.experienceRequired}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Salary Range</label>
                            <input
                                type="text"
                                name="salary"
                                placeholder="e.g., $80,000 - $100,000"
                                value={formData.salary}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Required Skills</label>
                            <input
                                type="text"
                                name="skills"
                                placeholder=""
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Benefits (Full Width) */}
                        <div className="md:col-span-2">
                            <label className="block font-medium mb-1">Deadline</label>
                            <input
                                type="text"
                                name="deadline"
                                placeholder="Enter deadline "
                                value={formData.deadline}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>

                    {/* Next Button */}
                    <div className="mt-6">
                        <button
                            onClick={nextStep}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Next: Job Description
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Job Description</h2>
                    <p className="text-gray-600 mb-4">Provide a detailed description of the job position</p>
                    <SunEditor
                        setContents={jobDescriptionContent}
                        onChange={setJobDescriptionContent}
                        setOptions={editorOptions}
                    />
                    <div className="flex justify-between mt-6">
                        <button onClick={prevStep} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                            Back
                        </button>
                        <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            Next: Responsibilities & Qualifications
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Responsibilities & Qualifications</h2>
                    
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Key Responsibilities</h3>
                        <SunEditor
                            setContents={responsibilitiesContent}
                            onChange={setResponsibilitiesContent}
                            setOptions={{
                                ...editorOptions,
                                minHeight: "150px",
                                maxHeight: "300px",
                            }}
                        />
                    </div>
                    
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Qualifications & Requirements</h3>
                        <SunEditor
                            setContents={qualificationsContent}
                            onChange={setQualificationsContent}
                            setOptions={{
                                ...editorOptions,
                                minHeight: "150px",
                                maxHeight: "300px",
                            }}
                        />
                    </div>
                    
                    <div className="flex justify-between mt-6">
                        <button onClick={prevStep} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                            Back
                        </button>
                        <button 
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-medium"
                            onClick={handleSubmit}
                        >
                            {state?._id ? "Update Job Opening" : "Post Job Opening"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddJobOpening;