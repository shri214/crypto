import { motion } from 'framer-motion';
import { json, useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import './style.css';
import Tooltip from '@mui/material/Tooltip';
import StarIcon from '@mui/icons-material/Star';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { ConvertNum } from '../../../function/ConvertNum';
import { useDispatch } from 'react-redux';
import { removeItem, removeItems } from '../../../function/removeItem';
import { addingItem, addingItems } from '../../../function/addingItems';
import { itemsAdding } from '../redux/action/actionCreationForItem';
import { addingItemWatch } from '../../reduxTK/dataSlice';
// import { addToWatchList } from "../../../function/saveInLocalStorage";

const List = ({ ele, ind }) => {
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
      <motion.tr
        className="list-items"
        initial={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: `1.${ind}`, delay: `0.${ind}` }}
      >
        <td className="image-section img-td" onClick={() => redirect(ele)}>
          <img src={ele.image} alt={ele.id} />
          <div>
            <Tooltip title={ele.symbol}>
              <p className="cap td-cap">{ele.symbol.toUpperCase()}-USD</p>
            </Tooltip>
            <Tooltip title={ele.name}>
              <p className="coin-name td-coin-name">{ele.name}</p>
            </Tooltip>
          </div>
        </td>
        {ele.price_change_percentage_24h > 0 ? (
          <td className="chip">
            <div className="cur_prices-green td-cur-price">
              <p>{ele.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
            <div className="uptrend rem">
              <TrendingUpIcon />
            </div>
          </td>
        ) : (
          <td className="chip">
            <div className="cur_prices-red td-cur-price">
              <p>{ele.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
            <div className="downtrend rem">
              <TrendingDownIcon />
            </div>
          </td>
        )}

        <td
          className={
            ele.price_change_percentage_24h > 0
              ? 'green  price-td-show'
              : 'red price-td-show'
          }
        >
          ${ele.current_price.toFixed(2)}
        </td>

        <Tooltip title="Total Volume">
          <td className="totals td-vol">
            ${ele.total_volume.toLocaleString()}
          </td>
        </Tooltip>
        <Tooltip title="Market Capital">
          <td className="totals td-vol"> ${ele.market_cap.toLocaleString()}</td>
        </Tooltip>
        <Tooltip title="Market Capital">
          <td className="totals converted-cap">
            {`${ConvertNum(ele.market_cap)}`}
          </td>
        </Tooltip>
        <td
          className={
            ele.price_change_percentage_24h > 0
              ? 'watchListG td-vol'
              : 'watchListR td-vol'
          }
          onClick={() => addToWatchList(ele.id)}
        >
          <Tooltip title={`${ele.name} add to Watch List`}>
            {ele['watch'] === true ? <StarIcon /> : <StarBorderRoundedIcon />}
          </Tooltip>
        </td>
      </motion.tr>
    </>
  );
};

export default List;
