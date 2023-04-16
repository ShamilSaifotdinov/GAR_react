import React from 'react'
import { Item } from '../AddressTable/Item';

export const AddressTable = ({ addresses, type }) => {

  return (
    <table className="table table-striped table-sm mb-0 p-0" aria-labelledby="tableLabel">
      <thead>
        <tr>
          <th></th>
          <th className="col-md-1">ID</th>
          <th>Наименование</th>
          <th className="col-md-1">Тип</th>
          <th>КЛАДР</th>
          <th>ОКАТО</th>
          <th>ОКТМО</th>
          <th className='tb-last-col'>Уровень</th>
        </tr>
      </thead>
      <tbody>
        {
          addresses.map(address => <Item address={address} type={type} />)
        }
      </tbody>
    </table>
  );
}
