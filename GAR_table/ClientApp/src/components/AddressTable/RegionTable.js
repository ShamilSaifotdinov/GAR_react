import React, { useEffect, useState } from 'react'
import { RegionItem } from './RegionItem';
import './Table.style.css'
import { useAddresses } from '../../hooks/address.hook';
import { ObjectInfo } from './ObjectInfo';

export const InfoModalContext = React.createContext({
  id: "",
  openInfo: () => { }
});

export const RegionTable = () => {
  const [openInfo, setInfo] = useState(false);
  const [childs, setChilds] = useState([])
  const [isLoading, getAddresses] = useAddresses()

  useEffect(() => {
    if (!childs.length) {
      getAddresses('regions')
        .then((data) => setChilds(data))
    }
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
            !isLoading ?
              childs.map(address => <RegionItem key={address.id} address={address} />)
              : <tr><td colSpan={8}>Загрузка...</td></tr>
          }
        </tbody>
        {/* <InfoModalContext.Provider value={{ id: "", openModal: () => setInfo(false) }}>
          <ObjectInfo isModal={openInfo} setModal={setInfo} objectId={address.id} />
        </InfoModalContext.Provider> */}
      </table>
  );
}
