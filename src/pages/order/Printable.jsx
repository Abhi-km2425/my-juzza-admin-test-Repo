import React from 'react';
import { formatDate } from "../../utils/DateFormat";


const Printable = React.forwardRef((props, ref) => {
    console.log("props", props?.data)
    console.log(new Date().toISOString())
    return (
        <div ref={ref}
            className='p-[20px] flex flex-col gap-5'
        >
            <h1 className='text-4xl text-center font-extrabold'>Invoice</h1>
            <p className='text-xl font-extrabold'>
                Sold By: JUZA Foods, Urangattiri, Kerala 673639, India 
            </p>
            
            <div className='flex justify-between'>
                <div className='w-1/2 flex flex-col'>
                    <span className='font-extrabold' >Order Id : {props?.data?.order[0]._id}</span>
                    <p><span className='font-extrabold'>Order Date :</span> {props?.data?.order[0].createdAt?.split('T')[0]?.split('-').reverse().join('-')}</p>
                    <p><span className='font-extrabold'>Invoice Date :</span> {new Date().toISOString().split('T')[0]?.split('-').reverse().join('-')}</p>
                    <p><span className='font-extrabold'>Total Items :</span> {props?.data?.orderProducts?.length}</p>
                </div>

                <div className='w-1/2 flex flex-col'>
                    <h2 className='font-extrabold'>Ship To</h2>
                    <span className='font-extrabold'>{props?.data?.address?.name}</span>
                    <span >{props?.data?.address?.houseName},
                        {props?.data?.address?.street}, {props?.data?.address?.city}, {props?.data?.address?.state},
                        {props?.data?.address?.postalCode}, 
                    </span>
                    <span >Phone : {props?.data?.address?.phone}</span>
                </div>

            </div>


            {
                props?.data?.orderProducts?.length > 0
                &&
                <table className='w-full border-t border-b border-black'>
                    <thead className=''>
                        <tr className='border-b border-black'>
                            <th className='py-2 px-4 text-left font-extrabold'>Product</th>
                            <th className='py-2 px-4 text-left font-extrabold'>Weight</th>
                            <th className='py-2 px-4 text-left font-extrabold'>Price</th>
                            <th className='py-2 px-4 text-left font-extrabold'>Quantity</th>
                            <th className='py-2 px-4 text-left font-extrabold'>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            props?.data?.orderProducts?.map((row, i) => (
                                <tr key={i}>
                                    <td className='py-2 px-4 text-left font-extrabold'>{row?.p_name}</td>
                                    <td className='py-2 px-4 text-left'>{row?.weight}</td>
                                    <td className='py-2 px-4 text-left'>₹{row?.finalPrice}</td>
                                    <td className='py-2 px-4 text-left'>{row?.cartProduct?.quantity}</td>
                                    <td className='py-2 px-4 text-left'>₹{row.finalPrice * row?.cartProduct?.quantity}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }

                <span className='font-extrabold text-2xl text-right mr-10' >Grand Total : ₹ {props?.data?.order[0]?.payment?.amount}</span>
                <span className='font-extrabold text-lg text-right mr-10' >Juza Foods Private Limited</span>
           
           

        </div>
    )
})

export default Printable