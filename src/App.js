import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import { makeStyles } from '@material-ui/core/styles'
import Alert from './Components/Alert';
import React from 'react';

const CoinPage = React.lazy(() => import('./Pages/CoinPage'));
const HomePage = React.lazy(() => import('./Pages/HomePage'));


const useStyle = makeStyles({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: "100vh",
  }
});
function App() {
  const classes = useStyle();
  return (
    <div className={classes.App}>
      <Header />
      <Routes>

        <Route path='/' element={<React.Suspense fallback='Loading...'><HomePage /> </React.Suspense>} />
        <Route path='/coins/:coinId' element={<React.Suspense fallback='Loading...'><CoinPage /> </React.Suspense>} />

      </Routes>
      <Alert></Alert>
    </div>
  );
}

export default App;
