import React from 'react';
import useInfiniteScroll from '../../useInfiniteScroll';
import getItems from '../../utils/getItems';
import './IList.css';

export default function IList() {
  const fetchData = async () => {
    const items = await getItems();
    return [items, Math.random() * 10 > 5];
  };
  const { data, Loading } = useInfiniteScroll(fetchData);

  return (
    <div className="list">
      {data.map((item, index) => {
        return (
          <div key={index} className="item">
            {item}
          </div>
        );
      })}
      {Loading}
    </div>
  );
}
