import React, { useEffect, useState } from 'react'
import { useGetAllTestsQuery } from '../pages/rtk/testApi';
import { io } from "socket.io-client";
import { addConversation, deleteConversation, fetchConversation } from '../Redux/slice/testSlice';
import { useDispatch, useSelector } from 'react-redux';
const Ayush = () => {


  const [data, setData] = useState("")

  const { conversation, loading, error } = useSelector((state) => state.test)


  // const url = "https://db.shanyascans.com"
  const url = "http://localhost:5000"

  const socket = io(url, {
    transports: ["websocket"],
    reconnection: true,
  });
  const dispatch = useDispatch()

  const handleSubmit = async () => {

    const data1 = {
      message: data
    }

    const response = await dispatch(addConversation(data1))
    if(response?.payload?.success) {
        setData("")
        fetchConver()
    }

  }


  const handleDelete=async()=>{
    console.log("Delete Message");
    
      const response=await dispatch(deleteConversation())
  }

  const fetchConver = async () => {
    const response = await dispatch(fetchConversation())
  }


  useEffect(() => {

    socket.on("connect", () => {
      console.log("🟢 Connected to Socket.io server:", socket.id);
    });


    socket.on("conversation", () => {
          fetchConver()
    });


    return () => {
      socket.off("connect");

    };
  }, []);

  useEffect(() => {
    fetchConver()
  }, [])

  console.log(conversation);


  return (
    <div className='min-h-screen flex items-center justify-center gap-10'>
      <button className='px-4 py-4 border bg-red-500 text-white' onClick={()=>handleDelete()}>Delete Message</button>
      <div className='flex items-center justify-center gap-4'>
        <input type="text" placeholder='Enter Your Messsage' className='p-4 border border-black' onChange={(e) => setData(e.target.value)} value={data} />
        <button className='px-4 py-4 border border-black' onClick={handleSubmit}>Add</button>
      </div>

      <div>
        {conversation && Array.isArray(conversation) && conversation.length > 0 &&
          conversation.map((item, index) => (
            <div key={index} className='flex items-center justify-center gap-4'>
              <p className='text-xl'>{item?.message}</p>
            </div>
          ))
        }
      </div>



    </div>
  )
}

export default Ayush