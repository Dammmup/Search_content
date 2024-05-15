  import { Input, Space, Button, ConfigProvider } from 'antd';
  import React, { useState } from 'react';
  import axios from 'axios';

  const { Search } = Input;

  export const SearchFilm=()=>{
      const [results, setSearchResults] = useState([]);

      const onSearch = async (value) => {
          try {
            const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/search?query=${value}`, {
              headers: {
                'X-API-KEY': 'TVNGA92-EXWMKR4-N35G404-MPWWSHX'
              }
            });
            console.log("SUCCES",response.data);
            setSearchResults(response.data);
          } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
          }
        };
        return(<><Search
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
                      </div>
                  ))}
              </div>
        </>)
      
        
  }