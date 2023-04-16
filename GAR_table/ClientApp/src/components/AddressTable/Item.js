import React, { useEffect, useState } from 'react'
import { AddressTable } from './Table';
import { ObjectInfo } from './ObjectInfo';

export const Item = ({ address, type }) => {
  const [openInfo, setInfo] = useState(false);
  const [childs, setChilds] = useState([])
  const [open, setOpen] = useState(false)


  const getAddresses = async (id, type) => {
    const response = await fetch(`addresses/${type}/${id}`);
    const data = await response.json();
    setChilds(data);
  }

  useEffect(() => {
    if (open && !childs.length) {
      getAddresses(address.id, type)
    }
  }, [open])

  return <>
    <tr key={address.id}>
      <td onClick={() => setOpen(!open)} style={{width: "32.8px"}}><i className={open ? "bi bi-chevron-down" : "bi bi-chevron-right"}></i></td>
      <td onClick={() => setInfo(true)}>{address.id}</td>
      <td onClick={() => setInfo(true)}>{address.name}</td>
      <td onClick={() => setInfo(true)}>{address.typeName}</td>
      <td onClick={() => setInfo(true)}>{address.code}</td>
      <td onClick={() => setInfo(true)}>{address.okato}</td>
      <td onClick={() => setInfo(true)}>{address.oktmo}</td>
      <td onClick={() => setInfo(true)} className='tb-last-col pr-0'>{address.level}</td>      
      {openInfo && <ObjectInfo isModal={openInfo} setModal={setInfo} objectId={address.id}/>}
    </tr>
    {
      open &&
      <tr>
        <td></td>
        <td colSpan={7} className='pr-0'>
          {
            childs.length ? <AddressTable addresses={childs} type={type} /> : "Дочернии элементы отсутствуют"
          }
        </td>
      </tr>
    }
  </>
}