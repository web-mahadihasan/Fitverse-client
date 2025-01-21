
const SectionHeading = ({title, subtitle}) => {
    return (
        <div>
            <h2 className="text-4xl text-center font-bold  font-kanit capitalize text-secondary-black  mb-7 tracking-wide dark:text-main-dark">{title}</h2>
            <p className="max-w-xl text-center text-gray-600 font-poppins mb-3 mx-auto">
                {subtitle}
            </p>
        </div>
    );
};

export default SectionHeading;