import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import qs from 'qs';
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { selectFilter } from "../redux/filter/selectors";
import { Pagination } from "../components/Pagination";
import { Sort } from "../components/Sort";
import { Categories } from "../components/Categories";
// import { sortList } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
// import { SearchPizzaParams } from "../redux/pizza/types";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { selectPizzaData } from "../redux/pizza/selectors";
import { useAppDispatch } from "../redux/store";
// import  Sort  from "../redux/slices/filterSlice";

const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const IsMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
 

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
    // eslint-disable-next-line
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  }
  
  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? String(categoryId) : '';
    const search = searchValue;
    
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
    // eslint-disable-next-line
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

   
  // useEffect(() => {
//     if (IsMounted.current) {
//       const queryString = qs.stringify({
//       sortProperty: sort.sortProperty,
//       categoryId,
//       currentPage,
//     })
//     navigate(`?${queryString}`)
//     }
//     IsMounted.current = true;

// }, [categoryId, sort.sortProperty, currentPage, navigate])

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
      
  //     const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
      
      
  //     dispatch(
  //       setFilters({
  //         params,
  //         sort: Sort,
  //       }),
  //     );
      // isSearch.current = true;
    
  // }, [dispatch]);

  

  

  

  const pizzas = items
  .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

return (
  <div className="container">
    <div className="content__top">
      <Categories value={categoryId} onChangeCategory={onChangeCategory} />
      <Sort value={sort} />
    </div>
    <h2 className="content__title">All pizzas</h2>
    {status === 'error' ? (
      <div className="content__error-info">
        <h2>Произошла ошибка 😕</h2>
        <p>
          К сожелению не удалось получить питсы. Попробуйте повторить попытку позже.
        </p>
      </div>
    ) : (
      <div className="content__items">
        {status === 'loading'
          ? skeletons
          : pizzas}
      </div>)}
    <Pagination currentPage={currentPage} onChangePage={onChangePage} />
  </div>
);

};
export default Home;