const ProgressBar = ({ step }) => {
    return (
        <div className="flex justify-center gap-2 sm:gap-3 mb-3">
            {[1, 2, 3].map((item) => (<div key={item} className={`h-1 w-14 sm:w-20 md:w-24 lg:w-32 rounded-full ${item <= step ? "bg-violet-500" : "bg-gray-700"} `} />
            ))}
        </div>
    );
};

export default ProgressBar;