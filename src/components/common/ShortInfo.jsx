
const ShortInfo = ({title, info}) => {
    return (
        <div>
            <p className="font-poppins text-gray-600 dark:text-gray-400 tracking-wider">{title}</p>
            <h6 className="text-xl font-poppins text-gray-700 dark:text-gray-300 font-semibold my-1">{info}</h6>
        </div>
    );
};

export default ShortInfo;