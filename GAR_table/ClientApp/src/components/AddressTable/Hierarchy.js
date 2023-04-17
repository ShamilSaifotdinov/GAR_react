import React, { useState } from 'react'
import { AddressTable } from './Table';

export const Hierarchy = ({ id, type, name }) => {
  const [open, setOpen] = useState(false)

  return <table className="table table-sm mb-0" aria-labelledby="tableLabel">
    <thead>
      <tr onClick={() => setOpen(!open)}>
        <th>{name}</th>
      </tr>
    </thead>
    {
      open
      && <tbody>
        <tr>
          <td className='pr-0'>
            <AddressTable type={type} id={id} />
          </td>
        </tr>
      </tbody>
    }
  </table>
}