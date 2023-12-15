/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from '../utils/debounce';
function useInfiniteScroll(fetchFunc) {

  const loadingRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);

  const loadMore = useCallback(debounce(async () => {
    setLoading(true);
    const [newData, more] = await fetchFunc?.();
    setHasMore(more);
    setData((prevData) => [...prevData, ...newData]);
    setLoading(false);
  }, 1000), []);

  //注册IntersectionObserver
  useEffect(() => {
    const targetEle = loadingRef.current;

    const observer = new IntersectionObserver((entries, curObserver) => {
      if (!hasMore) {
        curObserver.unobserve(targetEle);
        return;
      }
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadMore();
        }
      })
    }, {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: 1
    });

    if (targetEle) {
      observer.observe(targetEle);
    }
    return () => {
      if (targetEle) {
        observer.unobserve(targetEle);
      }
    }
  }, [loadMore, hasMore])



  return {
    data,
    hasMore,
    loading,
    Loading: hasMore ? <div ref={loadingRef}>Loading...</div> : <div ref={loadingRef}>无更多数据</div>,
  }
}

export default useInfiniteScroll;