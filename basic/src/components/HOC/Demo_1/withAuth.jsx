/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/display-name */
import { useEffect, useState } from "react"
import {Button} from 'antd';

function withAuth(InnerComponent) {

  return function(props){
    const [hasAuth,setHasAuth] = useState(false);

    useEffect(()=>{
        async function checkAuth(){
            setTimeout(()=>{
                //模拟获取当前用户有权限
                setHasAuth(true);
            },1000);
        }
        checkAuth();
    })

    if(!hasAuth) return void 0;

    return <InnerComponent {...props}/>
  }
}

/* eslint-disable react/prop-types */
//使用withAuthButton对Button进行二次封装
function AuthButton({...props}){
    return <Button {...props}>{props.children}</Button>
}

export default withAuth(AuthButton);

