

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Acute', 'Closed']

function Categories({value, onChangeCategory}) {
    

    // const onClickCategory = (index) => {
    //     setActiveIndex(index);
// }

  return (
    <div className="categories">
      <ul>
              {categories.map((item, i) => (
                <li key={i}
                  onClick={() => onChangeCategory(i)}
                  className={value === i ? 'active' : ''}>
                  {item}
                  </li>
              ))}
      </ul>
    </div>
  );
}

export default Categories;

