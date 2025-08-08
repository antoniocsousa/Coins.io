import SelectBox from '../SelectBox'
import { getCurrentRate } from '../../Services/rates'
import { useEffect, useState } from 'react'
import coins from '../../data/coins.json'
import './style.css'

export default function Quotation() {
    const [quotationOne, setQuotationOne] = useState({
        id: 128,
        code: 'USD',
        rate: {}
    })
    const [quotationTwo, setQuotationTwo] = useState({
        id: 18,
        code: 'BRL',
        rate: {}
    })

    const [value, setValue] = useState(1)
    const [textValueOne, setTextValueOne] = useState(1)
    const [textValueTwo, setTextValueTwo] = useState(1)

    async function fetchCurrentRate() {
        if (quotationOne.code === 'USD' || quotationTwo.code === 'USD') {
            const response = await getCurrentRate(quotationOne.code, quotationTwo.code)
            setQuotationOne({...quotationOne, rate: Object.values(response)[0]})

            var x = parseFloat(Object.values(response)[0].bid)
            setValue(x)
            setTextValueOne(1)
            setTextValueTwo(x.toFixed(4))
        }
        else {
            setValue(1)
            var response = await getCurrentRate('USD', quotationOne.code)
            setQuotationOne({...quotationOne, rate: Object.values(response)[0]})
            var x = parseFloat(Object.values(response)[0].bid)

            response = await getCurrentRate('USD', quotationTwo.code)
            setQuotationTwo({...quotationTwo, rate: Object.values(response)[0]})
            x = parseFloat(Object.values(response)[0].bid) / x
            setValue(x)
            setTextValueOne(1)
            setTextValueTwo(x.toFixed(4))
        }
    }

    useEffect(() => {
        fetchCurrentRate()
    }, [quotationOne.code, quotationTwo.code])

    return (
        <section className='quotation-container'>
            <div className="info-box">
                <h2>$ {value.toFixed(4)}</h2>
                <p>1 {quotationOne.code} hoje em {quotationTwo.code}</p>
            </div>
            <div className="quotation-box">
                <SelectBox setQuotation={setQuotationOne} id={quotationOne.id} 
                    value={textValueOne.toString().replace(".", ",")}
                    onChange={(e) => {
                        const rawValue = (e.target.value).replace(",", ".") || 0
                        setTextValueOne(rawValue)
                        setTextValueTwo((rawValue * value).toFixed(4))
                    }}
                />
                <img
                    src="src/Assets/transfer.svg" alt="reverse button" 
                    onClick={() => {
                        const id = quotationOne.id
                        const code = quotationOne.code
                        setQuotationOne({...quotationOne, id: quotationTwo.id, code: quotationTwo.code})
                        setQuotationTwo({...quotationTwo, id: id, code: code})
                    }} 
                />
                <SelectBox setQuotation={setQuotationTwo} id={quotationTwo.id} 
                    value={textValueTwo.toString().replace(".", ",")}
                    onChange={(e) => {
                        const rawValue = (e.target.value).replace(",", ".") || 0
                        setTextValueTwo(rawValue)
                        setTextValueOne((rawValue / value).toFixed(4))
                    }}
                />
            </div>
        </section>
    ) 
}