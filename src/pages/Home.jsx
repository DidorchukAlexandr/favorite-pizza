import { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import qs from 'qs';
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import Pagination from "../components/Pagination";
import { SearchContext } from '../App';
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import Pizzablock from "../components/Pizzablock";
import Skeleton from "../components/Pizzablock/Skeleton";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const IsMounted = useRef(false);


  const {categoryId, sort, currentPage} = useSelector((state) => state.filter);
 

const { searchValue } = useContext(SearchContext)
const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }
  
  const fetchPizzas = () => {
    setIsLoading(true);

  const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sort.sortProperty.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';
    
    axios.get(`https://64b55b40f3dbab5a95c732b2.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
    })
  }
   
  useEffect(() => {
    if (IsMounted.current) {
      const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    })
    navigate(`?${queryString}`)
    }
    IsMounted.current = true;

}, [categoryId, sort.sortProperty, currentPage, navigate])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
      
      
      dispatch(
        setFilters({
          params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;

  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  

  const pizzas = items
  .map((item) => <Pizzablock key={item.id} {...item} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
      <>
        <div className="container">
            <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {isLoading
              ? skeletons
              : pizzas}
          </div>
         <Pagination value={currentPage} onChangePage={onChangePage} />
          </div>
        </>
    )

}
export default Home;