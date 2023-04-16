import React, { useEffect, useState } from 'react'
import { Region } from './Region';
import './Table.style.css'

export const RegionTable = () => {
  const [childs, setChilds] = useState([])
  const [loaded, setLoaded] = useState(false)

  const getAddresses = async () => {
    const response = await fetch('addresses/regions');
    const data = await response.json();
    setChilds(data)
    setLoaded(true)
  }

  useEffect(() => {
    getAddresses()
  }, [])

  return (
    <table className="table table-striped table-sm" aria-labelledby="tableLabel">
      <thead>
        <tr>
          <th></th>
          <th className="col-md-1">ID</th>
          <th className="col-md-1">Тип</th>
          <th>Наименование</th>
          <th>КЛАДР</th>
          <th>ОКАТО</th>
          <th>ОКТМО</th>
          <th className='tb-last-col'>Уровень</th>
        </tr>
      </thead>
      <tbody>
        {
          loaded ?
            childs.map(address => <Region address={address}/>)
            : <tr><td colSpan={8}>Загрузка...</td></tr>
        }
      </tbody>
    </table>
  );
}
