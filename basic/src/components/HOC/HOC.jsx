/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
/*
  HOC：High Order Component
  定义：接收一个组件参数，返回一个新的组件
  用途：用于封装一些通用逻辑以增强传入组件的功能，添加一些通用样式等（提高复用性）
*/

/*
  拥有红色Title，以及loading状态, 并且传递onLoading事件
*/
export default function hoc(InnerComponent,delay,title) {
  return function(props) {
    const [loading,setLoading] = useState(false);

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
      <InnerComponent {...props} onLoading={(func)=>{ return func(loading)}}>
        <span style={{color:'black'}}>Loading...</span>
      </InnerComponent> : 
      <InnerComponent onLoading={(func)=>{ return func(loading)}} {...props}>
        <span style={{color:'red'}}>{title}</span>
      </InnerComponent>}
    </>
  }
}

