import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecured from '../../../../hooks/useAxiosSecured';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Loading from '../../../Loading/Loading';
import { RxCross1 } from 'react-icons/rx';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';
const { confirm } = Modal;

const ApplicantDetails = () => {
    const axiosSecured = useAxiosSecured()
    const location = useLocation()
    const id = location?.state?.id
    const navigate = useNavigate()
    const [disabledButton, setDisabledButton] = useState(true);
    const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
    const [rejectionId, setRejectionId] = useState(null);
    const [rejectFeedback, setRejectFeedback] = useState("")

    const {data: applicantData, refetch, isLoading} = useQuery({
        queryKey: ["applicantDetails", id],
        queryFn: async () => {
            const {data} = await axiosSecured.get(`/application-api/applicant-details/${id}`)
            return data
        }
    })

    
   const {
    _id,
    name,
    age,
    experience,
    biography,
    skills,
    availableDays,
    availableSlot,
    trainerStatus,
    note,
    image,
    email,
    date,
    totalHours
  } = applicantData || {};

  const checkIsConfirmAction = (e) => {
    setDisabledButton(true)
    setRejectFeedback(e.target.value)

    if(rejectFeedback.length > 10){
        setDisabledButton(false)
    }
    
} 
  // Handle accept application 
    const handleAcceptApplication = async (applicationData) => {
      try {
          const {data} = await axiosSecured.patch(`/application-api/accept-application/${applicationData._id}`, applicationData)
          console.log(data)
          if(data.modifiedCount > 0){
              Swal.fire({
                title: "Successfull",
                text: "Your applicaiton has been approved.",
                icon: "success"
              })
              refetch()
              navigate("/dashboard/admin/applied-trainer")
          }
      } catch (error) {
          console.log(error)
      }
    }

    // Handle Rejection 
    const showPromiseConfirm = (id) => {
      confirm({
        title: <span className="font-popins" style={{ fontWeight: 'bold', fontSize: '20px', color: '#ff4d4f' }}>Are you sure to Reject Application?</span>,
        icon: <ExclamationCircleFilled style={{ color: '#faad14' }} />,
        content: <span className="font-poppins my-4" style={{ fontSize: '16px', color: '#595959', marginBottom: '8px' }}>This will make changes, but you can change it again anytime</span>,
        okButtonProps: { style: { backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff', fontFamily: "poppins"} },
        cancelButtonProps: { style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: '#fff', fontFamily: "poppins" } },
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout( resolve , 1000);
          })
            .then(async () => {
              setRejectionId(id)
              setRejectionModalOpen(true)
            })
        },
        onCancel() {
          console.log('Cancelled');
        },
      });
    };
  
    const handleRejectConfirmation = async () => {
      const {_id, ...restData} = applicantData || {}
      const rejectApplication = {
        prevApplicationId: _id,
        ...restData,
        rejectNote: rejectFeedback
      }
       try {
            const {data} = await axiosSecured.patch(`/application-api/reject-application/${rejectionId}`, rejectApplication)
            if(data.modifiedCount > 0){
                Swal.fire({
                  title: "Successfull",
                  text: "This applicaiton has been rejected.",
                  icon: "success"
                })
                setRejectFeedback("")
                setRejectionModalOpen(false)
                refetch()
                navigate("/dashboard/admin/applied-trainer")
            }
            } catch (error) {
                console.log(error)
            }
    }
//   console.log(id)
    if(isLoading) return <Loading/>

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8 font-poppins">
      <Helmet>
          <title>Fitverse | Dashboard - Applicant details </title>
          <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
      </Helmet>
      <Link to={-1} className='inline-block mb-4 px-6 py-1 border-[5px] border-main rounded font-medium hover:bg-main hover:text-white duration-300'>Back</Link>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden shadow-md">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-grow">
          {/* Name and Status */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                trainerStatus === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {trainerStatus}
            </span>
          </div>

          {/* Biography */}
          <p className="text-gray-600 mt-4">{biography}</p>

          {/* Key Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Age</h3>
              <p className="text-gray-600">{age}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
              <p className="text-gray-600">{experience} years</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Available Days</h3>
              <p className="text-gray-600">{availableDays?.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Available Slots</h3>
              <p className="text-gray-600">{availableSlot?.join(', ')}</p>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Note */}
          {note && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Note</h3>
              <p className="text-gray-600 italic">{note}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 shadow-md"
          onClick={() => handleAcceptApplication(applicantData)}
        >
          Accept Application
        </button>
        <button
          disabled={trainerStatus === "reject"}
          className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 shadow-md"
          onClick={() => showPromiseConfirm(_id)}
        >
          Rejected
        </button>
        
      </div>

      {/* Rejection Modal  */}
      <>
           <div
               className={`${
                   rejectionModalOpen ? " visible" : " invisible"
               } w-full h-screen fixed top-0 left-0 z-50 bg-[#0201012a] flex items-center justify-center transition-all duration-300`} >
               <div
                   className={`${
                    rejectionModalOpen
                           ? " scale-[1] opacity-100"
                           : " scale-[0] opacity-0"
                   } lg:w-[30%] md:w-[40%] sm:w-[90%] w-full bg-gray-100 rounded-lg p-5 transition-all duration-300`} >
                   <div className="min-w-full flex items-center justify-between">
                       <h2 className="primary-black my-3 dark:text-gray-100 text-2xl font-poppins font-[600]">Add a Feeback for user</h2>
                       <RxCross1
                           className="p-2 text-[2rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                           onClick={() => setRejectionModalOpen(false)}
                       />
                   </div>
                   <div className="w-full">
                   <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                      <span className="text-sm text-gray-500">{format(date, "PP")}</span>
                    </div>

                    {/* Applicant Info */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Email:</span> {email}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Age:</span> {age}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Experience:</span> {experience} years
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Total Hours:</span> {totalHours} hours
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Trainer Status:</span> {trainerStatus}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-800">Skills:</h3>
                      <ul className="text-sm text-gray-600 list-disc pl-5">
                        {skills?.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                       <div className="mt-5 flex flex-col gap-4">
                           <label className="font-[400] text-gray-700 font-poppins">Write something for comfirm rejection.</label>
                           <textarea onChange={checkIsConfirmAction} value={rejectFeedback} name="description" className="font-poppins peer min-h-[100px] border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-main transition-colors duration-300"></textarea>                    
                       </div>
                       <div className="mt-8 flex w-full items-end justify-end gap-[13px]">
                           <button onClick={() => setRejectionModalOpen(false)}
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
    </div>
  );
};

export default ApplicantDetails;
