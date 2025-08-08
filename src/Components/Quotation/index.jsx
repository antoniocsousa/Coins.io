import SelectBox from '../SelectBox'
import { getCurrentRate } from '../../Services/rates'
import { useEffect, useState } from 'react'
import pairs from '../../data/pairs.json'
import './style.css'

export default function Quotation() {
    const [codeOne, setCodeOne] = useState('USD')
    const [codeTwo, setCodeTwo] = useState('BRL')
    const [rate, setRate] = useState({})

    async function fetchCurrentRate() {
        const response = await getCurrentRate(codeOne, codeTwo)
        setRate(response)
        console.log(response)
    }

    useEffect(() => {
        fetchCurrentRate()
    }, [codeOne, codeTwo])

    var pairsOne = pairs[codeTwo]
    var pairsTwo = pairs[codeOne]

    return (
        <section className='quotation-container'>
            <div className="info-box">
                <h2>R$ 5,52</h2>
                <p>1 dólar americano hoje em real brasileiro</p>
            </div>
            <div className="quotation-box">
                <SelectBox setCode={setCodeOne} initialId={128} pairs={pairsOne}/>
                <img src="src\Assets\transfer.svg" alt="transfer image" />
                <SelectBox setCode={setCodeTwo} initialId={18} pairs={pairsTwo}/>
            </div>
        </section>
    ) 
}