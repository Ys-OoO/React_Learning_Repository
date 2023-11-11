/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
/*
  HOC：High Order Component
  定义：接收一个组件参数，返回一个新的组件
  用途：用于封装一些通用逻辑以增强传入组件的功能，添加一些通用样式等（提高复用性）
*/
export default function HOC({ InnerComponent, asycnFunc, ...props }) {
  return (props) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      async function getData() {
        setIsLoading(true);
        await asycnFunc();
        setIsLoading(false);
      }
      getData();
    }, []);

    return <InnerComponent {...props}>{isLoading ? 'loading...' : undefined}</InnerComponent>;
  };
}
