import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import './style.css';
import Tooltip from '@mui/material/Tooltip';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarIcon from '@mui/icons-material/Star';
import { addingItem} from '../../../function/addingItems';
import {  removeItems } from '../../../function/removeItem';
import { useDispatch } from 'react-redux';
import { addingItemWatch } from '../../reduxTK/dataSlice';

const Grid = ({ ele, ind }) => {
  const navigation = useNavigate();
  let dispatch = useDispatch();

  const redirect = (element) => {
    navigation(`/coin/${element.id}`);
  };

  const addToWatchList = (id) => {
    if (localStorage.getItem('UsersList')) {
      let flag = true;
      let users=JSON.parse(localStorage.getItem('UsersList'))
      let login=JSON.parse(localStorage.getItem('loginUser'));
      for (let i = 0; i < users.length; i++) {
        let listName = users[i][0];
        if (listName === login.email) {
          for (let j = 1; j < users[i].length; j++) {
            if (users[i][j] === id) {
              flag=false;
              removeItems(id);   
            }
          }
        }
      }
      if (flag) {
        
        addingItem(id)
      }
    } else {
      
      addingItem(id);
    }
    let data =JSON.parse(localStorage.getItem('usersList'));
    dispatch(addingItemWatch({data}));
  };

  return (
    <>
      <motion.div
        className={
          ele.price_change_percentage_24h > 0
            ? `listOfCoins greenBack`
            : `listOfCoins redBack`
        }
        key={ind}
        initial={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: `1.${ind}`, delay: `0.${ind}` }}
      >
        <div className="upper-List">
          <div className="image-section" onClick={() => redirect(ele)}>
            <img src={ele.image} alt={ele.id} />
            <div>
              <Tooltip title={ele.symbol}>
                <p className="cap">{ele.symbol.toUpperCase()}-USD</p>
              </Tooltip>
              <Tooltip title={ele.name}>
                <p className="coin-name">{ele.name}</p>
              </Tooltip>
            </div>
          </div>
          <Tooltip title={`${ele.name} add to Watch List`}>
            <div
              className={
                ele.price_change_percentage_24h > 0
                  ? 'watchListG w'
                  : 'watchListR w'
              }
              onClick={() => addToWatchList(ele.id)}
            >
              {ele['watch'] === true ? <StarIcon /> : <StarBorderRoundedIcon />}
            </div>
          </Tooltip>
        </div>
        {ele.price_change_percentage_24h > 0 ? (
          <div className="chip-green">
            <div className="cur_prices-green">
              <p>{ele.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
            <div className="uptrend">
              <TrendingUpIcon />
            </div>
          </div>
        ) : (
          <div className="chip-red">
            <div className="cur_prices-red">
              <p>{ele.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
            <div className="downtrend">
              <TrendingDownIcon />
            </div>
          </div>
        )}

        <div className="prices">
          <div
            className={ele.price_change_percentage_24h > 0 ? 'green' : 'red'}
          >
            <h3>${ele.current_price}</h3>
          </div>
          <div>
            <Tooltip title="Total Volume">
              <p className="total">Total Volume: ${ele.total_volume}</p>
            </Tooltip>
            <Tooltip title="Market Capital">
              <p className="total">Market Cap: ${ele.market_cap}</p>
            </Tooltip>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Grid;
