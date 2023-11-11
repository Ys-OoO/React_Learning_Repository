/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import hoc from '../HOC/HOC';


 function Card(props) {
  const {onLoading} = props;

  useEffect(()=>{
    if(onLoading){
      onLoading((loading)=>{
        console.log('正在加载',loading);
      })
    }
    console.log("card");
  },[onLoading])

  return (
    <div style={{width:200,height:200,backgroundColor:'#fff'}} {...props}>
      {props.children}
    </div>
  )
}
export default hoc(Card,2000,"Card Title");