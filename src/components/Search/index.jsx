
import React, { useContext, useRef } from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';
import styles from './Search.module.scss';
import { useState, useCallback } from 'react';




const Search = () => {

  const [value, setValue] = useState('');
    const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();
  

   
  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  }
  
  const updateSearchValue = useCallback( 
    debounce((str) => {
        setSearchValue(str);
      }, 250),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }
    
    
    
    
     return (
         <div className={styles.root}>
             <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
         <input
           ref={inputRef}
                value={value}
                 onChange={onChangeInput}
                 className={styles.input} placeholder="pizza search..." />
             {value && (<svg onClick={onClickClear}
                 className={styles.clearIcon}
                 height="48"
                 viewBox="0 0 48 48"
                 width="24"
                 xmlns="http://www.w3.org/2000/svg">
                 <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
                 <path d="M0 0h48v48h-48z" fill="none" />
             </svg>)}
     </div>
    )
}
export default Search;