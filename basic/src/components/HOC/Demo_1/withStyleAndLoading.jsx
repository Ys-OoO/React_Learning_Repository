/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/display-name */
import { useEffect, useState } from "react"
import {Modal} from 'antd';

function withStyleAndLoading(InnerComponent,delay,titleText) {

  return (props) =>{
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
      setTimeout(()=>{
        setLoading(false);
      },delay);
    },[])

    const withStyleTitle = <div style={{color:'red'}}>{titleText}</div>

    
    return <InnerComponent {...props} loading={loading} title={withStyleTitle}>
      {loading ? 'loading...': void 0}
    </InnerComponent>
  }
}

/* eslint-disable react/prop-types */
//使用withStyleAndLoading对Modal进行二次封装
function StyleAndLoadingModal({loading,children:loadingDom,...props}){
  useEffect(()=>{
    if(loading){
      console.log('loading...');
    }else{
      console.log('loaded');
    }
  },[loading])
  return (
    <Modal {...props}>
      {loadingDom}
    </Modal>
  )
}

export default withStyleAndLoading(StyleAndLoadingModal,2000,"This is Title");
