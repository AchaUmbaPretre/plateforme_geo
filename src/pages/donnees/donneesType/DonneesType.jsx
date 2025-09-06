import { useEffect, useState } from 'react'
import { getDonneesType } from '../../../services/donnees.service'
import './donneesType.scss'

const DonneesType = () => {
    const [data, setData] = useState([]);

    const fetchData = async() => {
        try {
            const { data } = await getDonneesType();
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

  return (
    <>
        <div className="donneesType">
            AAAAAAAAAAA
        </div>  
    </>
  )
}

export default DonneesType