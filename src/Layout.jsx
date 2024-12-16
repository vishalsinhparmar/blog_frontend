import About from "./Componets/About";
import {  Myprovider } from "./Componets/Contextcomponets/CreateContext";
import Footer from "./Componets/Footer";
import Header from "./Componets/Header";
import Home from "./Componets/Home";
import {BrowserRouter as Router,Routes,Route, Outlet} from "react-router-dom"

const Layout = ()=>{
      return (
         <Myprovider>
         <div className="">
            
               <Header/> 
                <main>
                 <Outlet/>
                </main>
               <Footer />
              
         </div>
            
         </Myprovider>
      )
}
 export default Layout;