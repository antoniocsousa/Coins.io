import { useState } from 'react'
import coins from '../../data/coins.json'
import './style.css'

export default function SelectBox(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [coinList, setCoinList] = useState(coins);
    const [id, setId] = useState(props.initialId)
    

    function handleClick() {
        setIsOpen(!isOpen)
    }

    function handleChange(e) {
        const value = e.target.value.toLowerCase()
        setCoinList(coins.filter((coin) => coin.name.toLowerCase().includes(value)))
    }

    var coinSelected = coins.filter((coin) => coin.id === id)

    return (
        <div className="select-box">
            <div className="option-box">
                <div className="option" onClick={handleClick}>
                    <img src={coinSelected[0].flag} alt="" />
                </div>
                <input type="text" value={props.value}
                    onChange={props.onChange}
                    onKeyDown={(event) => {
                        const allowed = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete", ","]

                        if (!/[0-9]/.test(event.key) && !allowed.includes(event.key)) {
                            event.preventDefault()
                        }
                    }}
                />
            </div>
            {
                isOpen && (
                    <div className="content">
                        <input className='search' type="text" placeholder='Search' onChange={handleChange}/>
                        <ul className="options">
                            {coinList.map((coin, index) => (
                                <li 
                                    key={coin.id}
                                    onClick={() => {
                                        setId(coin.id)
                                        setIsOpen(!isOpen)
                                        props.setCode((prevCode) => {return {...prevCode, code: coin.code}})
                                    }}
                                >
                                    <img src={coin.flag} alt="" />{coin.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div>
    )
}