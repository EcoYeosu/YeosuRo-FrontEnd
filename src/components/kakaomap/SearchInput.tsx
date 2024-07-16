'use client';
import * as React from "react";
import { useEffect, useState } from 'react';

const SearchInput: React.FC = () => {
    const [searchVal, setSearchVal] = useState('');

    return (
        <div>
            <input
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
            />
        </div>
    )
};

export default SearchInput;