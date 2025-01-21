import ClassCard from "../../components/common/ClassCard";
import SectionBadge from "../../components/common/SectionBadge";
import SectionHeading from "../../components/common/SectionHeading";
import useGetClass from "../../hooks/useGetClass";

const AllClass = () => {
    const [allClass] = useGetClass()
    console.log(allClass)
    return (
        <div className="my-24">
            <div>
            <SectionBadge title={"Our Trainers"}/>
            <SectionHeading
              title={"Find Your Perfect Class Today"}
              subtitle={"Our comprehensive list of classes has something for everyone. Join a session that matches your fitness goals and start transforming your health today"}
            />
            </div>
            <section className="max-width mx-auto px-4 xl:px-0">
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