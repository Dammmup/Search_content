import { Input, Space, Button, ConfigProvider } from 'antd';
const { Search } = Input;

export const SearchGif=()=>{
    <Search
        placeholder="введите название"
        allowClear
        enterButton="Поиск"
        style={{ width: 300 }}
        onSearch={onSearch}
      />
}