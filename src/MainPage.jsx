import { Layout } from "antd"
import Buttons from "./UI/components/SearchBar"

export const MainPage=()=>{
    return(<>
    <header>
     <Buttons/>
     </header>
     <div style={{textAlign:'center',marginTop: '10px'}}>
          <h2 className='text'>Добро пожаловать на мой проект: Сервис по поиску медиаконтента!</h2>
</div>
<div style={{marginTop:'500px'}}/>

<footer >
<Layout/>
            <h5 style={{textAlign:'center'}}>Find us</h5>
          
            
            <div style={{display:'flex',justifyContent:'space-around'}}>
            <p> +7(747)8313398  </p>
            <p> damir.-@mail.ru </p>
            </div>



            

         
           
         
            
            </footer>


    </>)
}