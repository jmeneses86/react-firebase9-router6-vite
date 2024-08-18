const FormError = ({ errors }) => {
    return (
        <>
            {errors && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span class="font-medium">Oops!</span> {errors.message}
                </p>
            )}
        </>
    );
};

export default FormError;
