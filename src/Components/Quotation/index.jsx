import SelectBox from '../SelectBox'
import './style.css'

export default function Quotation() {
    return (
        <section className='quotation-container'>
            <div className="info-box">
                <h2>R$ 5,52</h2>
                <p>1 dólar americano hoje em real brasileiro</p>
            </div>
            <div className="quotation-box">
                <SelectBox />
                <img src="src\Assets\transfer.svg" alt="sla" />
                <SelectBox />
            </div>
        </section>
    ) 
}