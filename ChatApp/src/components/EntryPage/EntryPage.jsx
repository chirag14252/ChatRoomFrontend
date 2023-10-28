import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Helmet} from 'react-helmet';
import LoginForm from "./Login/LoginForm";

const EntryPage = () => {
    return (
        <>
         <Helmet>
         <style>{'body { background-color: black; }'}</style>
         </Helmet>
         
           <LoginForm />
       </>
      
    )
}

export default EntryPage;