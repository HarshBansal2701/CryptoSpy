import React from 'react'
import "./Banner/Banner.css"


const SelectButton = ({ childern , selected , onClick}) => {
    console.log("ndcneclkcn",childern)
  return (
    <span className ="but" onClick={onClick} style={{
        border : "1px solid gold",

        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected? "gold" : "gray",
        color: selected? 'black': "",
        fontWeight: selected? 700 : 500,
        width: "22%",
        height: "40px"
    }}>{ childern }
    </span>
  )
}

export default SelectButton