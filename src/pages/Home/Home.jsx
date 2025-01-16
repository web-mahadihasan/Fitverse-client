import { useEffect, useState } from "react";
import Banner from "../../components/common/Banner/Banner";
import ClassCard from "../../components/common/ClassCard";


const Home = () => {
    const [classes, setClasses] = useState([])

    useEffect(()=> {
        fetch('/testClass.json')
        .then(res => res.json())
        .then(data => setClasses(data))
    },[])
    console.log(classes)

    return (
        <div className="min-h-screen font-poppins">
            <div>
                <Banner/>
            </div>
            {/* <div>
                this is home
            </div> */}

            {/* Top clasess  */}
            <section>
                <div className="grid grid-cols-3 gap-6 my-10">
                    {
                        classes?.slice(0, 6).map((classInfo, idx) => <ClassCard key={idx} classInfo={classInfo}/>)
                    }
                </div>
            </section>
        </div>
    );
};

export default Home;