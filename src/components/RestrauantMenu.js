import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
//import { MENU_API } from "../Utils/constants";
//import { useParams } from "react-router-dom";
import useRestrauantMenu from "../Utils/useRestrauantMenu";
//import Restraucard from "./Restraucard";
import RestraucardCategory from "./RestraucardCategory";
const RestrauantMenu=()=>{
  const resMenu=useRestrauantMenu();
  const dummy ="dummy info"

  const[shoIndex,setShoIndex]=useState(null);
  console.log(shoIndex);

   if (resMenu===null) return <Shimmer/>;
  const {name,avgRating,costForTwoMessage,cuisines}= resMenu.cards[0].card.card.info
  const {itemCards} = resMenu.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card.card ;
  console.log(resMenu.cards[2].groupedCard.cardGroupMap.REGULAR.cards);
  
  const catagories = resMenu.cards[2].groupedCard.cardGroupMap.REGULAR.cards.filter((e)=>{
  return  e.card.card["@type"] =="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  })

  console.log(catagories);

    return(
        <div className="text-center font-extrabold ">
          
             <h1 className="text-blue-500 font-extrabold text-3xl m-2 ">{name}</h1>
                    {/* <h3>{cuisines.join(" , ")}</h3>
                    <p>{costForTwoMessage}</p>
                    <p>{avgRating}</p>*/}
           
                    {/* {
                     itemCards.map((item)=>(
                    <li key={item.card.info.id}>{item.card.info.name}</li>     
                     ))
                     }  */}
            <ul>  
                {
                catagories.
              map((category,index)=>(<RestraucardCategory 
                data={category.card.card}
               show={index===shoIndex?true:false}
                setShowIndex={()=>setShoIndex(index)}
                dumm={dummy}
                />))
                }
           </ul>
        </div>
    )
}

export default RestrauantMenu ;