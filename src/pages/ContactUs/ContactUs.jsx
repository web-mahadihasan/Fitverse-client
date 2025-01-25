import { Icon } from "@iconify/react/dist/iconify.js";
import SectionBadge from "../../components/common/SectionBadge";
import SectionHeading from "../../components/common/SectionHeading";
import GoogleMapReact from 'google-map-react';
import React, { useState } from 'react';
import { Map, Marker } from "pigeon-maps"
import { Helmet } from "react-helmet";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const ContactUs = () => {
    const [hue, setHue] = useState(0)
    const color = `hsl(218deg 94% 61%)`
    
    
    const contactInfo = [
          {
            "title": "Headquarters",
            "info": "1270 Memory Lane, Chicago, IL 60605, United States",
            "icon": <Icon icon="tdesign:map-location" width="28" height="28" />
          },
          {
            "title": "Personal Training",
            "info": "John Commack, john@fitversebd.com, (510) 320-1234",
            "icon": <Icon icon="tabler:user-star" width="28" height="28" />
          },
          {
            "title": "Email Us",
            "info": "angie@fitversebd.com, debbie@fitversebd.com",
            "icon": <Icon icon="lucide:mail-open" width="28" height="28" />
          },
          {
            "title": "Call Us At",
            "info": "(510) 320-5678, (510) 320-6789",
            "icon": <Icon icon="fluent:call-add-24-regular" width="28" height="28" />
          }
        ]
      
      
    return (
        <div className="max-width mx-auto px-4 xl:px-0">
            <Helmet>
                <title>Fitverse | Contact us </title>
                <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
            </Helmet>
            <div className="my-10">
                <SectionBadge title={"User Review"}/>
                <SectionHeading
                title={"Some User Feedback here"}
                subtitle={"This keeps it short and engaging while inviting users to explore the feedback. Let me know if you need alternate phrasing!"}
                />
            </div>

            {/* Contact section  */}
            <section className="mb-24 grid grid-cols-1 md:grid-cols-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-4 lg:gap-7">
                    {
                        contactInfo.map((contact, idx) => (
                            <div key={idx} className="p-4">
                                <p className="text-main ">{contact.icon}</p>
                                <h4 className="text-2xl font-kanit text-semibold my-3 text-secondary-black dark:text-main-dark">{contact.title}</h4>
                                <p className="pr-8 font-poppins text-gray-600 dark:text-gray-500">{contact.info}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="h-full min-h-[300px]">
                     <div className='h-full w-full rounded-md'>
                        <Map defaultCenter={[25.749402250789693, 89.26108640089947]} defaultZoom={11}>
                        <Marker 
                            width={50}
                            anchor={[25.749402250789693, 89.26108640089947]} 
                            color={color} 
                            onClick={() => setHue(hue + 20)} 
                        />
                        <Marker 
                            width={50}
                            anchor={[25.749402250789693, 89.26108640089947]} 
                            color={color} 
                            onClick={() => setHue(hue + 20)} 
                        >
                            {/* <FaLocationDot className='text-red-500'/> */}
                        </Marker>
                        </Map>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default ContactUs;