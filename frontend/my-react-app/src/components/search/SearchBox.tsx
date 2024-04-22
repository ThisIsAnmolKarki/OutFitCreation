import React, { useEffect, useRef, useState, ChangeEvent } from "react";

interface props{
    getSearchData: (data:string) => void
}

const SearchBox: React.FC <props>= (props) => {

    const inputRef = useRef<HTMLInputElement>(null); // Specify the type for ref with HTMLInputElement
    const [inputValue, setInputValue] = useState<string>(''); // Define type of state
    const [displayValue, setDisplayValue] = useState<string|undefined>(''); // Define type of state

    // Function to handle real-time input change


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearchData = (val: string)=>{
        props.getSearchData(val);
    }


    // Debouncing effect that updates displayValue after 2 seconds of inactivity
    useEffect(() => {
        const handler = setTimeout(() => {
            setDisplayValue(inputValue);
            handleSearchData(inputValue);
        }, 100); // Update only after 2 seconds

        return () => clearTimeout(handler); // Clear timeout if input changes again before 2 seconds
    }, [inputValue]); // Effect runs on each change to inputValue

    // Optional: Focus the input when the component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <>
            <input
                ref={inputRef}
                type="text"
                placeholder="search products"
                value={inputValue}
                onChange={handleInputChange}
            />
        </>
    );
}

export default SearchBox;
