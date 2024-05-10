import React, { useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';

const { Search } = Input;

export const SearchMusic = () => {
    const [results, setSearchResults] = useState([]);

    const onSearch = async (value) => {
        try {
            const response = await axios.get(`/deezer/search?q=${value}`);
            setSearchResults(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <>
            <Search
                placeholder="введите название"
                allowClear
                enterButton="Поиск"
                style={{ width: 300 }}
                onSearch={onSearch}
            />

            <div className="results-container">
                {results.map((result) => (
                    <div key={result.id}>
                        <h3>{result.title}</h3>
                        <p>{result.artist.name}</p>
                        {/* Другие детали о треке, которые вы хотите отобразить */}
                    </div>
                ))}
            </div>
        </>
    );
};
