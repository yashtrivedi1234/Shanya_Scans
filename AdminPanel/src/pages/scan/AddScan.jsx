import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
import { useAddScanMutation, useEditScanMutation } from "@/Rtk/scanApi";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Spinner from "../Loading/SpinLoading";
import { useParams } from "react-router-dom";

const AddScan = ({data}) => {
  
    const [serviceDetailName, setServiceDetailName] = useState(data?.serviceDetailName || "");
    const [editorContent, setEditorContent] = useState(data?.serviceDetail || ""); // SunEditor state
    const [servicePhoto, setServicePhoto] = useState(data?.servicePhoto || null);
    const [iconPhoto, setIconPhoto] = useState(data?.iconPhoto || null);
    const [spinLoading,setSpinLoading]=useState(false)

    const [addScan, { isLoading, isError, isSuccess }] = useAddScanMutation(); 
    const [editScan, { isLoading:isEditLoading, isError:isEditError, isSuccess:isEditSuccess }]=useEditScanMutation()

    


    const handleFileChange = (e, setter) => {
        const file = e.target.files[0];
        setter(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinLoading(true)
    
        const formData = new FormData();
        formData.append("serviceDetailName", serviceDetailName);
        formData.append("serviceDetail", editorContent);
        if (servicePhoto) formData.append("servicePhoto", servicePhoto); // ✅ Ensure file exists
        if (iconPhoto) formData.append("iconPhoto", iconPhoto); // ✅ Ensure file exists
    
        try {
            let response
            if(data){
                response=await  editScan({formData,id:data?._id})
            }else{
                   response=await addScan(formData);
            }
       
            if(response?.data){
                 setServiceDetailName("")
                 setEditorContent("")
                 setIconPhoto("")
                 setServicePhoto("")
            }
 
            
        } catch (error) {
            console.error("Error adding scan:", error);
        }
        setSpinLoading(false)
    };



    
    

    return (
        <div className="p-6 bg-white shadow-md rounded-lg  ">
            <h2 className="text-2xl font-semibold mb-4">  {data ? "Edit Scan " :"Add Scan"} </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service Name */}
                <div>
                    <label className="block font-medium">Service Detail Name</label>
                    <input
                        type="text"
                        value={serviceDetailName}
                        onChange={(e) => setServiceDetailName(e.target.value)}
                        className="w-full p-2 border border-black rounded-md"
                        required
                    />
                </div>

                {/* Service Photo Upload */}
                <div>
                    <label className="block font-medium">Service Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setServicePhoto)}
                        className="w-full p-2 border border-black rounded-md"
                    />
                </div>

                {/* Icon Photo Upload */}

                <div>
                    <label className="block font-medium">Icon Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setIconPhoto)}
                        className="w-full p-2 border border-black rounded-md"
                    />
                </div>

                {/* SunEditor for Service Details */}
                <div>
                    <label className="block font-medium">Service Detail</label>
                    <div className="border border-black min-h-[20rem] max-h-[40rem] overflow-y-auto">
                        <SunEditor
                            setContents={editorContent}
                            onChange={setEditorContent}
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
                        />
                    </div>

                </div>


                {/* Submit Button */}
                {spinLoading ?  <Spinner/>  :  <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                 {data? "Edit Scan" :"Add Scan"}
                </button> }
                
            </form>
        </div>
    );
};

export default AddScan;
