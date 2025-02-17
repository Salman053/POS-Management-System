import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
    value: string;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    iconClassName?: string;
    onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
    value,
    placeholder = 'Search...',
    className = '',
    inputClassName = '',
    iconClassName = '',
    onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => { },
}) => {
    return (
        <div className={`relative flex items-center ${className}`}>
            <Search
                className={`absolute left-3 h-4 w-4 text-gray-800 ${iconClassName}`}
            />
            <Input
                type="text"
                value={value}
                onChange={onSearchChange}
                placeholder={placeholder}
                className={`h-10 pl-9 bg-white text-sm ${inputClassName}`}
            />
        </div>
    );
};


// Usage example component
const CustomSearchInput = ({
    placeholder,
    onSearchChange,
    value,
    className = '',
    inputClassName = '',
}: {
    placeholder?: string,
    onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    className?: string,
    inputClassName?: string,
}) => {
    return (
        <SearchInput
            value={value as string}

            placeholder={placeholder}
            iconClassName="text-gray-400"
            className={`w-full  ${className}`}
            onSearchChange={onSearchChange}
            inputClassName={`border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${inputClassName}`}
        />
    );
};

export default CustomSearchInput;