
import Booksreq from "./req_books" 
import Booksret from "./retunred_books"
import Booksiss from "./issued_books"
import Helpreq from "./help_req"
import Signupst from "./stsignup"
import Loginst from "./stlogin"
import Authentication from "./auth"
import Signupsf from "./sfsignup"
import Loginsf from "./sflogin"
import Sthome from "./st_home";
import BorrowedBooks from "./borrowed_books";
import Request from "./request_book";
import Help from "./help";
import Sfhome from "./sf_home";
import Addbook from "./Add";
import Updatebook from "./Update";
import "./style.css"
import Axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
const { Outlet } = require("react-router-dom")


const Route = require("react-router-dom").Route;
const Routes = require("react-router-dom").Routes;

function App() {

const [authcheck_staff, setauthcheck_staff]= useState(false)
const [authcheck_std, setauthcheck_std]= useState(false)
  useEffect(()=>
  {
    Axios.get("http://localhost:5000/isstaffauth",{
      headers:{
          "x-access-token_staff": localStorage.getItem("token_staff")
      }
  })
  .then((res)=>{
      console.log(res.data)
      if(res.data.hasOwnProperty("auth")){
          console.log("here")
          setauthcheck_staff(true)
      }
      else{
        setauthcheck_staff(false)
      }
  })
  },[])

// const Check=()=>{
//   return <div>you're not authorized</div>
// }
const Protectedroutes_staff= ()=>{
  console.log("isauth", authcheck_staff)
  return (authcheck_staff ? <Outlet/> : <Authentication/>)
}

  useEffect(()=>{
    Axios.get("http://localhost:5000/isstdauth",{
      headers:{
          "x-access-token_std":localStorage.getItem("token_stud")
      }
  })
  .then((res)=>{
      console.log(res.data)
      if(res.data.hasOwnProperty("auth")){
        console.log("student")
        setauthcheck_std(true)
      }
      else{
        setauthcheck_std(false)
      }
  })

},[])



const Protectedroutes_std=()=>{
  return (authcheck_std ? <Outlet/> : <Authentication/>)
}
  return (
    <Routes>
       <Route  path="/sfsignup" element={<Signupsf/>} />
       <Route  path="/sflogin"  element={<Loginsf/>} />
       <Route  path="/"         element={<Authentication/>} />
       <Route  path="/stsignup" element={<Signupst/>} />3
       <Route  path="/stlogin"  element={<Loginst/>} />
       <Route element={<Protectedroutes_staff/>}>
       <Route  path="/helpreq"  element={<Helpreq/>} />
       <Route  path="/issbooks" element={<Booksiss/>} />
       <Route  path="/retbooks" element={<Booksret/>} />
       <Route  path ="reqbooks" element={<Booksreq/>}/>
       <Route  path="/sfhome"   element={<Sfhome />} />
       <Route  path="/addbook"  element={<Addbook />} />
       <Route  path="/updatebook/:id" element={<Updatebook />} />
       </Route>
       <Route element={<Protectedroutes_std/>}>
       <Route  path="/sthome" element={<Sthome />} />
       <Route  path="/borrowed_books" element={<BorrowedBooks />} />
       <Route  path="/request" element={<Request/>} />
       <Route  path="/help"    element={<Help />} />
      </Route>
    </Routes>
  )
}
export default App