import React from 'react';
import useInfiniteScroll from '../../useInfiniteScroll';
import getItems from '../../utils/getItems';
import './IList.css';

export default function IList() {
  const fetchData = async () => {
    const items = await getItems();
    return {
      data: items,
      more: true,
    };
  };
  const { data, Loading, loadingRef } = useInfiniteScroll(fetchData);

  return (
    <div className="list">
      {data.map((item, index) => {
        return (
          <div key={index} className="item">
            {item}
          </div>
        );
      })}
      <div ref={loadingRef}>加载...</div>
    </div>
  );
}
