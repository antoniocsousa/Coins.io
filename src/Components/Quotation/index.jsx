import SelectBox from '../SelectBox'
import { getCurrentRate } from '../../Services/rates'
import { useEffect, useState } from 'react'
import './style.css'

export default function Quotation() {
    const [quotationOne, setQuotationOne] = useState({
        code: 'USD',
        rate: {}
    })
    const [quotationTwo, setQuotationTwo] = useState({
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
                <SelectBox setCode={setQuotationOne} initialId={128} 
                    value={textValueOne.toString().replace(".", ",")}
                    onChange={(e) => {
                        const rawValue = (e.target.value).replace(",", ".") || 0
                        setTextValueOne(rawValue)
                        setTextValueTwo((rawValue * value).toFixed(4))
                    }}
                />
                <img src="src/Assets/transfer.svg" alt="transfer image" />
                <SelectBox setCode={setQuotationTwo} initialId={18} 
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