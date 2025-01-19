
import React, {useState} from "react";

// react icons
import {RxCross1} from "react-icons/rx";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import Swal from "sweetalert2";

const RejectedFeedback = ({ modalOpen, setModalOpen, rejectionId}) => {
    const [rejectFeedback, setRejectFeedback] = useState("")
    const [disabledButton, setDisabledButton] = useState(true);

    const checkIsConfirmAction = (e) => {
        setDisabledButton(true)
        setRejectFeedback(e.target.value)

        if(rejectFeedback.length > 10){
            setDisabledButton(false)
        }
        
    }


    return (
        <>
            <div
                className={`${
                    modalOpen ? " visible" : " invisible"
                } w-full h-screen fixed top-0 left-0 z-50 bg-[#0201012a] flex items-center justify-center transition-all duration-300`}
            >
                <div
                    className={`${
                        modalOpen
                            ? " scale-[1] opacity-100"
                            : " scale-[0] opacity-0"
                    } lg:w-[30%] md:w-[40%] sm:w-[90%] w-full bg-gray-100 rounded-lg p-5 transition-all duration-300`}
                >
                    <div className="min-w-full flex items-center justify-between">
                        <h2 className="primary-black my-3 dark:text-gray-100 text-2xl font-poppins font-[600]">Add a Feeback for user</h2>
                        <RxCross1
                            className="p-2 text-[2rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                            onClick={() => setModalOpen(false)}
                        />
                    </div>

                    <div className="w-full">
                        <p className="text-gray-500 text-[1rem] font-poppins font-[400]">
                            Provide a brief reason for rejection and guide the applicant on how to improve and reapply.  
                        </p>

                        <div className="mt-5 flex flex-col gap-4">
                            {/* <label className="font-[400] text-black">Type <b>"DELETE"</b> to confirm</label> <br/>
                            <input onChange={checkIsConfirmAction} type="text"
                                   className="py-3 px-4 border border-gray-200 rounded-md mt-1 w-full outline-none focus:border-primary"/> */}
                            <label className="font-[400] text-gray-700 font-poppins">Write something for comfirm rejection.</label>
                            <textarea onChange={checkIsConfirmAction} name="description" className="peer min-h-[100px] border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-main transition-colors duration-300"></textarea>                    
                        </div>

                        <div className="mt-8 flex w-full items-end justify-end gap-[13px]">
                            <button onClick={() => setModalOpen(false)}
                                    className={`py-2 px-6 rounded font-[500] z-10 border border-[#cecece] text-gray-500`}>Cancel
                            </button>
                            <button onClick={handleRejectConfirmation}
                                    className={`py-2 font-popins text-lg font-medium px-5 rounded-md ${disabledButton ? "!bg-[#FDECEB] !border-[#FDECEB] text-red-200 cursor-not-allowed" : "bg-red-600 text-white border-red-600"}`}
                                    disabled={disabledButton}>Rejected
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default RejectedFeedback;
          