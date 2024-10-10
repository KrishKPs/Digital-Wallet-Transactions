export function Input ( {type, placeholder, value, onChange ,className, ...props  } ) {

    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange}
            className={`border p-3 rounded-md ${className}`} {...props}
        />
    );       


}

