import { useGetAllHomeCollectionQuery } from '@/Rtk/orderApi'
import React from 'react'

const HomeCollection = () => {

    const { data, isLoading } = useGetAllHomeCollectionQuery()

    console.log(data);


    return (
        <div>HomeCollection</div>
    )
}

export default HomeCollection