import ClassCard from "../../components/common/ClassCard";
import useGetClass from "../../hooks/useGetClass";

const AllClass = () => {
    const [allClass] = useGetClass()
    console.log(allClass)
    return (
        <div>
            
            <section className="">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-24">
                    {
                        allClass?.map(classInfo => <ClassCard key={classInfo._id} classInfo={classInfo}/>)
                    }
                </div>
            </section>
        </div>
    );
};

export default AllClass;