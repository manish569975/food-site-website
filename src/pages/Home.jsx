import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import Categories from '../Category'
import Card from'../components/Card'
import{food_items} from '../food'
import { dataContext } from '../context/UserContext'
import { RxCross2 } from "react-icons/rx";
import Card2 from '../components/Card2'
import { useSelector } from 'react-redux'
function Home(){
let{cate,setCate,input,showCart,setShowCart}=useContext(dataContext)    

    function filter(category){
        if(category==="All"){
            setCate(food_items)
        }else{
            let newList=food_items.filter((item)=>(item.food_category===category))
            setCate(newList)
        }
    }

    let items=useSelector(state=>state.cart)

   
    return(
        <div className='bg-slate-200 w-full min-h-screen' >
            <Nav/>
            {input?<div className='flex flex-wrap justify-center
            items-center gap-5 w-[100%]'>
                {Categories.map((item)=>{

                    // card

                  return<div className=' w-[140px] h-[150px] bg-white flex flex-col items-start
                  gap-5 p-5 justify-start text-[20px] font-semibold text-gray-600
                  rounded-lg shadow-xl hover:bg-green-200 cursor-pointer
                  transition-all duration-200'onClick={()=>filter(item.name)}>
                     {item.icon}
                    {item.name}

                  </div>
           })}
            </div>:null}
            
            <div className='w-full flex flex-wrap gap-5px-5 justify-center items-center
            pt-8'>
            {cate.map((item)=>(
                <Card name={item.food_name} image={item.food_image}
                price={item.price} id={item.id} type={item.food_type}/>
            ))}    
            </div>   
                <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-6 
                    transition-all duration-500 ${showCart?"translate-x-0":"translate-x-full"}`} >
                    <header className='w-[100%] flex justify-between items-center '>
   <span className='text-green-400 text-[18px] font-semibold'>order items</span>
   <RxCross2  className='w-[30px] h-[30px] text-green-400 text-[18px] font-semibold cursor-pointer hover:text-gray-600'onClick={()=>
   setShowCart(false)
   }/>
                    </header>
                    <div className='w-full mt-9 flex flex-col gap-8'>
                        {items.map((item)=>(
                          <Card2 name={item.name} price={item.price} image={item.image}
                          id={item.id } qty={item.qty}/>
                          ))}
                    </div>
                    
                </div>
            </div>
    )
}
export default Home