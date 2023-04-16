import React, { useEffect, useState } from 'react'
import { AddressTable } from './Table';

export const RegionItem = ({ id, type, name }) => {
  const [childs, setChilds] = useState([])
  const [open, setOpen] = useState(false)


  const getAddresses = async (id) => {
    const response = await fetch(`addresses/${type}/${id}`);
    const data = await response.json();
    setChilds(data);
  }

  useEffect(() => {
    if (open && !childs.length) {
      getAddresses(id)
    }
  }, [open])

  return <>
    <thead>
      <tr onClick={() => setOpen(!open)}>
        <th>{name}</th>
      </tr>
    </thead>
    {
      open && ( childs.length ? <AddressTable addresses={childs} type={type} /> : "Дочернии элементы отсутствуют" )
    }
  </>
}