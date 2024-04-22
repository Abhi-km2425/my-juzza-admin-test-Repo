import React from 'react';
import { formatDate } from "../../utils/DateFormat";


const Printable = React.forwardRef((props, ref) => {
    console.log("props", props?.data)
    return (
        <div ref={ref}
            className='p-[20px] flex flex-col gap-5'
        >
            <h1 className='text-primary text-2xl text-center'>Order Report</h1>

            <span >Name : {props?.data?.userDetails?.name}</span>
            <span >Email : {props?.data?.userDetails?.email}</span>
            <span >Phone : {props?.data?.userDetails?.number}</span>
            <span >Ordered Date : {props?.data?.order[0].createdAt?.split('T')[0]?.split('-').reverse().join('-')}</span>
            <span >Shipping Address : {props?.data?.address?.houseName},
                {props?.data?.address?.street}, {props?.data?.address?.city}, {props?.data?.address?.state},
                {props?.data?.address?.postalCode}, {props?.data?.address?.phone},
            </span>


            {
                props?.data?.orderProducts?.length > 0
                &&
                <table className='w-full bg-white'>
                    <thead>
                        <tr className='bg-black text-white rounded-lg'>
                            <th className='py-2 px-4 border-b border-r'>Product name</th>
                            <th className='py-2 px-4 border-b border-r'>Weight</th>
                            <th className='py-2 px-4 border-b border-r'>Price</th>
                            <th className='py-2 px-4 border-b border-r'>Quantity</th>
                            <th className='py-2 px-4 border-b border-r'>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            props?.data?.orderProducts?.map((row, i) => (
                                <tr key={i}>
                                    <td className='py-2 px-4 border-b border-r'>{row?.p_name}</td>
                                    <td className='py-2 px-4 border-b border-r'>{row?.weight}</td>
                                    <td className='py-2 px-4 border-b border-r'>₹{row?.finalPrice}</td>
                                    <td className='py-2 px-4 border-b border-r'>{row?.cartProduct?.quantity}</td>
                                    <td className='py-2 px-4 border-b border-r'>₹{row.finalPrice * row?.cartProduct?.quantity}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }

           
           

        </div>
    )
})

export default Printable