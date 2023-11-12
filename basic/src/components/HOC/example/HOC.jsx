/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
/*
  HOC：High Order Component
  定义：接收一个组件参数，返回一个新的组件
*/

/*
  拥有红色Title，以及loading状态, 并且传递onLoading事件以及状态
*/
export default function hoc(InnerComponent,delay,text) {
  return function(props) {
    const [loading,setLoading] = useState(false);
        
    const title = loading ?<span style={{color:'black'}}>Loading...</span> :<span style={{color:'red'}}>{text}</span>
    useEffect(()=>{
      async function asyncFunc(){
        setLoading(true);
        setTimeout(()=>{
          setLoading(false);
        },delay);
      }
      asyncFunc();
      console.log("hoc");
    },[])
    return <>
      {loading ? 
      <InnerComponent {...props} onLoading={(func)=>{ return func(loading)}} title={title}>
      </InnerComponent> : 
      <InnerComponent onLoading={(func)=>{ return func(loading)}} title={title} {...props}>
      </InnerComponent>
      }
    </>
  }
}

