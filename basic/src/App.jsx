import Card from './components/Card/Card';
import AuthButton from './components/HOC/Demo_1/withAuth';
import StyleAndLoadingModal from './components/HOC/Demo_1/withStyleAndLoading';
import {useState} from 'react';
function App() {

  const [open,setOpen] = useState(false)
  const openModal = ()=>{
    setOpen(true);
  }

  return (
    <>
      <Card/>
      <AuthButton onClick={openModal}>open</AuthButton>
      <StyleAndLoadingModal open={open}></StyleAndLoadingModal>
    </>
  );
}

export default App;
