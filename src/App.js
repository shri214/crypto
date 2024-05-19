import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Component/Header/Header';
import Dashboard from './Component/Dashboard';
import LandingPage from './Component/LandingPage/LandingPage';
import CoinPage from './Component/DetailCoin/CoinPage';
import ComparePage from './Compare/ComparePage/Compare';
import WatchList from './Component/WatchList';
import SignupForm from './Component/credential/sign';
import LoginForm from './Component/credential/login';
import Profile from './Component/credential/profile';

function App() {
  
  return (
    <>
       <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coin/:id" element={<CoinPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/watch" element={<WatchList />} />
      </Routes>
    </>
  );
}

export default App;
