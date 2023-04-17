import React, { useState } from 'react'
import { AddressTable } from './Table'
import { ObjectInfo } from './ObjectInfo'
import { InfoModalContext } from './RegionTable';

export const Item = ({ address, type }) => {
  const [openInfo, setInfo] = useState(false);
  const [open, setOpen] = useState(false)

  return <>
    <tr>
      {/* <InfoModalContext.Consumer> */}
        <td onClick={() => setOpen(!open)} style={{ width: "32.8px" }}><i className={open ? "bi bi-chevron-down" : "bi bi-chevron-right"}></i></td>
        <td onClick={() => setInfo(true)}>{address.id}</td>
        <td onClick={() => setInfo(true)}>{address.name}</td>
        <td onClick={() => setInfo(true)}>{address.typeName}</td>
        <td onClick={() => setInfo(true)}>{address.code}</td>
        <td onClick={() => setInfo(true)}>{address.okato}</td>
        <td onClick={() => setInfo(true)}>{address.oktmo}</td>
        <td onClick={() => setInfo(true)} className='tb-last-col pr-0'>{address.level}</td>
      {/* </InfoModalContext.Consumer> */}
      {openInfo && <ObjectInfo isModal={openInfo} setModal={setInfo} objectId={address.id} />}
    </tr>
    {
      open &&
      <tr>
        <td></td>
        <td colSpan={7} className='pr-0'>
          <AddressTable type={type} id={address.id} />
        </td>
      </tr>
    }
  </>
}