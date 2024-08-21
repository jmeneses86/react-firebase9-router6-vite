import ButtonLoading from "./ButtonLoading";

const Button = ({ type, text, color, loading, onClick }) => {
    if (loading) return <ButtonLoading type={color}></ButtonLoading>;

    const buttonClass =
        "focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ";

    let buttonClassColor;
    if (color == "purple") {
        buttonClassColor =
            "bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
    }
    if (color == "blue") {
        buttonClassColor =
            "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900";
    }
    if (color == "red") {
        buttonClassColor =
            "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
    }
    if (color == "yellow") {
        buttonClassColor =
            "bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900";
    }

    return (
        <button
            type={type}
            className={buttonClass + buttonClassColor}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
