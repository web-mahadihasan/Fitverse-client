import { useEffect, useState } from 'react';
import Select from 'react-select';


const Step2Content = ({slotInfo, setSelectedClass, selectedClass}) => {
    const {name, email, age, experience, slotName, classHour, classtitle, availableDays} = slotInfo || {}
    
    const [classOption, setclassOption] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const transformedOptions = classtitle?.map(item => ({
          label: item,
          value: item
        }))
        setclassOption(transformedOptions)
        setLoading(false)
    }, [classtitle]);

    const optionOnChange = (selectedOption) => {
        setSelectedClass(selectedOption.value);
      };

    //   console.log(selectedClass)
    if(loading) return <p>Loading...</p>
    return (
        <section className="w-full p-4 md:p-8 min-h-[500px] mx-auto border border-gray-200 step2box-shadow ">
            <div>
                <h3 className="text-center text-3xl font-poppins font-semibold py-2 border-b-2 max-w-md mx-auto border-gray-300 text-main">-- Slot Details --</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className=" h-full space-y-4">
                    <h3 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg lg:text-xl font-medium text-primary-black dark:text-main-dark">Trainer Name: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{name}</span>
                    </h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg lg:text-xl font-medium text-primary-black dark:text-main-dark">Trainer Email: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{email}</span>
                    </h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg lg:text-xl font-medium text-primary-black dark:text-main-dark">Experience: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{experience} Years</span>
                    </h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg lg:text-xl font-medium text-primary-black dark:text-main-dark">Trainer Age: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{age} Years</span>
                    </h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg lg:text-xl font-medium text-primary-black dark:text-main-dark">Slot Name: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{slotName}</span>
                    </h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 lg:gap-2 xl:grid-cols-3 items-center">
                        <span className="text-lg lg:text-xl font-medium text-primary-black dark:text-main-dark">Class Duration: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{classHour} Hours</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg lg:text-xl font-medium text-primary-black dark:text-main-dark">Day: </span>
                        <div className="flex items-center flex-wrap gap-2 xl:col-span-2">
                            {
                                availableDays.map(day => (
                                    <p key={day} className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{day}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="text-center pl-4 h-full border-l-2 border-gray-300">
                    <h3 className="text-2xl my-2 text-center font-medium text-primary-black dark:text-main-dark">Please Choose a Class to Continue</h3>
                    <div className='md:w-full lg:w-[75%] mx-auto my-6'>
                        {
                            classtitle && <Select
                            options={classOption}
                            name="visaType"
                            onChange={optionOnChange}
                            placeholder="Select a Class"
                            />
                        }
                    
                    </div>
                    <h3 className='text-xl font-medium text-gray-700 my-3 dark:text-gray-300'>Your Selected Class</h3>
                    <h3 className='font-poppins text-gray-700 dark:text-gray-400'>{selectedClass}</h3>
                </div>

            </div>
        </section>
    );
};

export default Step2Content;