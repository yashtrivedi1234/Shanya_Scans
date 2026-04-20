import { useAddLabTestMutation, useEditLabTestMutation } from "@/Rtk/labTestTag";
import { useAddPackageMutation, useUpdatePackageMutation } from "@/Rtk/packageApi";
import { useAddScanTestMutation } from "@/Rtk/scanTestApi";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Spinner from "../Loading/SpinLoading";

const AddPackage = () => {
    const [step, setStep] = useState(1);
    const navigate=useNavigate()
    const location = useLocation()
    const { state } = location

    console.log(state);
    
    const { slug } = useParams()

    const [data, setdata] = useState({
        testDetailName: state?.packageName || "",
        department: state?.category || "",
        fasting: state?.fasting || "",
        paramterInclude: state?.parameterInclude || "",
        recommedFor: state?.recommedFor || "",
        testRequirement: state?.testRequirement1 || "",
        testInstructionsEng: state?.testDetails1 || "",
        testInstructionsHin: state?.testDetails2 || "",
        testDetails: state?.packageOverview
        || "",
        department: "Pathology",
        reportConsuling: state?.reportConsuling,
        reportTime: state?.report || "",
        sampleCollection: state?.sampleCollection || "",
        testPrice: state?.testPrice || state?.packageDiscount ,
        age: state?.age || "",
        category: state?.slug || "",
        photo: null
    });
    const [editorContent2, setEditorContent2] = useState(state?.instructionEnglish || ""); // SunEditor state
    const [editorContent3, setEditorContent3] = useState(state?.instructionHindi || ""); // SunEditor state
    const [editContent4, setEditorContent4] = useState(state?.packageParamterDetails || "")
    const [addScanTest, { isLoading, isError, isSuccess }] = useAddScanTestMutation();
    const [addLabTest] = useAddLabTestMutation()
    const [editLabTest] = useEditLabTestMutation()
    const [addPackage] = useAddPackageMutation()
    const [updatePackage]=useUpdatePackageMutation()
    const [spinLoading, setSpinLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value });
    };

    const handleEditorChange = (content, name) => {
        setdata({ ...data, [name]: content });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setdata({ ...data, photo: file });
    };




    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);


    const handleSubmit = async (e) => {

        data.testInstructionsEng = editorContent2
        data.testInstructionsHin = editorContent3

        let response
        setSpinLoading(true)

        const formData = new FormData()
        formData.append("packageName", data.testDetailName)
        formData.append("packageParamterDetails", editContent4)
        formData.append("age", data.age)
        formData.append("fasting", data.fasting)
        formData.append("instructionEnglish", data.testInstructionsEng)
        formData.append("instructionHindi", data.testInstructionsHin)
        formData.append("packageDiscount", data.testPrice)
        formData.append("packageRate", data.testPrice)
        formData.append("packageOverview", data.testDetails)
        formData.append("packagePhoto", data.photo)
        formData.append("parameterInclude", data.paramterInclude)
        formData.append("recommededfor", data.recommedFor)
        formData.append("report", data.reportTime)

        if (state) {
            response = await updatePackage({ formData, id: state?._id }).unwrap()
        } else {
            response = await addPackage(formData).unwrap()
        }


        if (response?.data) {
            setdata({
                testDetailName: "",
                department: "",
                fasting: "",
                paramterInclude: "",
                recommedFor: "",
                testRequirement: "",
                testInstructionsEng: "",
                testInstructionsHin: "",
                testDetails: "",
                department: slug,
                editContent4: '',
            })
            setEditorContent4("")
            setEditorContent2("")
            setEditorContent3("")
            navigate(".", { replace: true, state: null });
            setStep(1)
        }
        setSpinLoading(false)
    }


    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {step === 1 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Basic Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Test Name (Full Width) */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="block font-medium mb-1">Package Name</label>
                            <input
                                type="text"
                                name="testDetailName"
                                placeholder="Enter test name"
                                value={data.testDetailName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Package Photo (Full Width) */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="block font-medium mb-1">Package Photo</label>
                            <input
                                type="file"
                                name="packagePhoto"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Preview Image */}
                        {data.packagePhoto && (
                            <div className="md:col-span-2 lg:col-span-3">
                                <img
                                    src={URL.createObjectURL(data.packagePhoto)}
                                    alt="Package Preview"
                                    className="w-40 h-40 object-cover mt-2 border rounded"
                                />
                            </div>
                        )}


                        <div>
                            <label className="block font-medium mb-1">Department</label>
                            <input
                                type="text"
                                name="department"
                                placeholder="Enter department"
                                value={data.department}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Age Group</label>
                            <input
                                type="text"
                                name="age"
                                placeholder="Enter age group"
                                value={data.age}
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
                                value={data.category}
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
                                value={data.fasting}
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
                                value={data.reportTime}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Parameter Included</label>
                            <input
                                type="text"
                                name="paramterInclude"
                                placeholder="Enter parameter included"
                                value={data.paramterInclude}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block font-medium mb-1">Package Price</label>
                            <input
                                type="number"
                                name="testPrice"
                                placeholder="Enter test price"
                                value={data.testPrice}
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
                    <h2 className="text-xl font-bold mb-4">Package Description</h2>
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
                        setContents={data?.testDetails}
                        onChange={(content) => handleEditorChange(content, "testDetails")}
                    />
                    <p className="font-semibold">Package Paramters</p>
                    <SunEditor
                        setContents={editContent4}
                        onChange={setEditorContent4}
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
                    <div className="flex justify-between mt-4">
                        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                        <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
                    </div>
                </div>
            )}


            {step === 3 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Package Instructions</h2>
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
                        {spinLoading ? <Spinner /> :
                            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleSubmit()}>Submit</button>
                        }
                    </div>
                </div>
            )}


        </div>
    );
};

export default AddPackage;
