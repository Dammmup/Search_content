import { Input, Space, Button, ConfigProvider } from 'antd';
const { Search } = Input;

export const InterestingDays=()=>{
    return(<>
     <Search
        placeholder="введите название"
        allowClear
        enterButton="Поиск"
        style={{ width: 300 }}
        onSearch={onSearch}
      />
    </>)
}