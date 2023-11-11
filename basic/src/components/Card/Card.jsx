/* eslint-disable react-refresh/only-export-components */
import HOC from '../HOC/HOC';

/* eslint-disable react/prop-types */
function Card({ ...props }) {
  return (
    <div>
      Card
      {props.children}
    </div>
  );
}

export default HOC(Card, function asyncFunc() {
  setTimeout(() => {
    console.log('success');
  }, 2000);
});
