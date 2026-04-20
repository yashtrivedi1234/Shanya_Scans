import { useAddLabTestMutation, useEditLabTestMutation } from "@/Rtk/labTestTag";
import { useAddScanTestMutation } from "@/Rtk/scanTestApi";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const AddLabTest = () => {
    const [step, setStep] = useState(1);
   
    const location=useLocation()

    const {state}=location

    
    const {slug}=useParams()
    
    const [formData, setFormData] = useState({
        testDetailName: state?.testDetailName || "",
        department: state?.category || "",
        fasting: state?.fasting || "",
        paramterInclude: state?.paramterInclude || "",
        recommedFor: state?.recommedFor || "",
        testRequirement: state?.testRequirement1 || "",
        testInstructionsEng: state?.testDetails1 || "",
        testInstructionsHin: state?.testDetails2 || "",
        testDetails: state?.testRequirement1 || "",
        department:"Pathology",
        reportConsuling:state?.reportConsuling,
        reportTime:state?.reportTime || "",
        sampleCollection:state?.sampleCollection || "",
        testPrice:state?.testPrice,
        age:state?.age || "",
        category:state?.slug || ""
    });
    const [editorContent2, setEditorContent2] = useState(state?.testDetails1 || ""); // SunEditor state
    const [editorContent3, setEditorContent3] = useState(state?.testDetails2 || ""); // SunEditor state
     const [addScanTest, { isLoading, isError, isSuccess }] = useAddScanTestMutation(); 
     const [addLabTest]=useAddLabTestMutation()
     const [editLabTest]=useEditLabTestMutation()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditorChange = (content, name) => {
        setFormData({ ...formData, [name]: content });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);


    const handleSubmit=async(e)=>{
        
       formData.testInstructionsEng=editorContent2
       formData.testInstructionsHin=editorContent3

       let response

       if(state){
          response=await editLabTest({data:formData,id:state?._id})  
       }else{
        response=await addLabTest({data:formData})  
       }
      
     
       if(response?.data){
          setFormData({
            testDetailName: "",
            department: "",
            fasting: "",
            paramterInclude: "",
            recommedFor: "",
            testRequirement: "",
            testInstructionsEng: "",
            testInstructionsHin: "",
            testDetails: "",
            department:slug
        })
        navigate(".", { replace: true, state: null });
        setEditorContent2("")
        setEditorContent3("")
        setStep(1)
       }  
    }


    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {step === 1 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Basic Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Test Name (Full Width) */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="block font-medium mb-1">Test Name</label>
                            <input
                                type="text"
                                name="testDetailName"
                                placeholder="Enter test name"
                                value={formData.testDetailName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* 2-Column Inputs */}
                        <div>
                            <label className="block font-medium mb-1">Department</label>
                            <input
                                type="text"
                                name="department"
                                placeholder="Enter department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* <div>
                            <label className="block font-medium mb-1">Sub Department</label>
                            <input
                                type="text"
                                name="subDepartment"
                                placeholder="Enter sub department"
                                value={formData.subDepartment}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div> */}

                        {/* 3-Column Inputs */}
                        <div>
                            <label className="block font-medium mb-1">Age Group</label>
                            <input
                                type="text"
                                name="age"
                                placeholder="Enter age group"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Category</label>
                            <input
                                type="text"
                                name="category"
                                placeholder="Enter category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Fasting Requirement</label>
                            <input
                                type="text"
                                name="fasting"
                                placeholder="Enter fasting requirement"
                                value={formData.fasting}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* 2-Column Inputs */}
                        <div>
                            <label className="block font-medium mb-1">Parameter Included</label>
                            <input
                                type="text"
                                name="paramterInclude"
                                placeholder="Enter parameter included"
                                value={formData.paramterInclude}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Recommended For</label>
                            <input
                                type="text"
                                name="recommedFor"
                                placeholder="Enter recommended for"
                                value={formData.recommedFor}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* 3-Column Inputs */}
                        <div>
                            <label className="block font-medium mb-1">Report Consulting</label>
                            <input
                                type="text"
                                name="reportConsuling"
                                placeholder="Enter report consulting"
                                value={formData.reportConsuling}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Report Time</label>
                            <input
                                type="text"
                                name="reportTime"
                                placeholder="Enter report time"
                                value={formData.reportTime}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Sample Collection</label>
                            <input
                                type="text"
                                name="sampleCollection"
                                placeholder="Enter sample collection"
                                value={formData.sampleCollection}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Test Price (Full Width on small, 2-column on large) */}
                        <div className="md:col-span-2">
                            <label className="block font-medium mb-1">Test Price</label>
                            <input
                                type="number"
                                name="testPrice"
                                placeholder="Enter test price"
                                value={formData.testPrice}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>

                    {/* Next Button */}
                    <div className="mt-4">
                        <button
                            onClick={nextStep}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}


            {step === 2 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Test Description</h2>
                    <SunEditor
                    
                        setOptions={{
                            minHeight: "200px", // Minimum height before scrolling
                            maxHeight: "400px", // Maximum height, scroll enabled after this
                            buttonList: [
                                ["undo", "redo"],
                                ["bold", "underline", "italic", "strike"],
                                ["font", "fontSize", "formatBlock"],
                                ["fontColor", "hiliteColor"],
                                ["align", "list", "lineHeight"],
                                ["table"],
                                ["link"],
                                ["image", "video"],
                                ["codeView"],
                            ],
                            linkProtocol: "",
                            addTagsWhitelist: "a[href]",
                            sanitize: false,
                            defaultTag: "div",
                        }}
                        setContents={formData?.testDetails}
                        onChange={(content) => handleEditorChange(content, "testDetails")}
                    />
                    <div className="flex justify-between mt-4">
                        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                        <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
                    </div>
                </div>
            )}


            {step === 3 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Test Instructions</h2>
                    <p className="font-semibold">English</p>
                    <SunEditor
                           setContents={editorContent2}
                           onChange={setEditorContent2}
                        setOptions={{
                            minHeight: "100px",
                            maxHeight: "200px",
               
                            buttonList: [
                                ["undo", "redo"],
                                ["bold", "underline", "italic", "strike"],
                                ["font", "fontSize", "formatBlock"],
                                ["fontColor", "hiliteColor"],
                                ["align", "list", "lineHeight"],
                                ["table"],
                                ["link"],
                                ["image", "video"],
                                ["codeView"],
                            ],
                            linkProtocol: "",
                            addTagsWhitelist: "a[href]",
                            sanitize: false,
                            defaultTag: "div",
                        }}
                 
                    />
                    <p className="font-semibold mt-4">Hindi</p>
                    <SunEditor
                    setContents={editorContent3}
                    onChange={setEditorContent3}
                        setOptions={{
                            minHeight: "100px",
                            maxHeight: "200px",
                            buttonList: [
                                ["undo", "redo"],
                                ["bold", "underline", "italic", "strike"],
                                ["font", "fontSize", "formatBlock"],
                                ["fontColor", "hiliteColor"],
                                ["align", "list", "lineHeight"],
                                ["table"],
                                ["link"],
                                ["image", "video"],
                                ["codeView"],
                            ],
                            linkProtocol: "",
                            addTagsWhitelist: "a[href]",
                            sanitize: true,
                            defaultTag: "div",
                        }}

                    />
                    <div className="flex justify-between mt-4">
                        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={()=>handleSubmit()}>Submit</button>
                    </div>
                </div>
            )}


        </div>
    );
};

export default AddLabTest;
