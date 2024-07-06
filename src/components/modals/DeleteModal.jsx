import { IoClose } from 'react-icons/io5';

const DeleteModal = ({setDeleteModal,deleteCata, content}) => {

    const CancelModal = ()=>{
        setDeleteModal(false)
    }

    const ConfirmDeletion = async()=>{
        deleteCata()
    }

  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-50'>
       <div className='relative bg-white mt-60  md:mt-0 rounded-lg p-5 md:p-10 m-5 flex flex-col  gap-5'>
            <h1 className="font-bold text-center text-xl text-red-500">
                Do you want to {content} ?
            </h1>
            <IoClose
                onClick={CancelModal}
                className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer bg-primary"
            />
            <div className='w-full flex justify-evenly'>
                <button onClick={CancelModal}
                className="p-2 px-5 rounded text-sm text-white bg-primary" >
                    Cancel
                </button>

                <button onClick={ConfirmDeletion}
                className="p-2 px-5 rounded text-sm text-white bg-red-500">
                    Confirm
                </button>
            </div>
        </div> 
    </div>
  )
}

export default DeleteModal