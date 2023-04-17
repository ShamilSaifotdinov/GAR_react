import React, { useState } from 'react'
import { Hierarchy } from './Hierarchy';
import { ObjectInfo } from './ObjectInfo';

export const RegionItem = ({ address }) => {
  const [openInfo, setInfo] = useState(false);
  const [open, setOpen] = useState(false)

  return <>
    <tr>
      <td onClick={() => setOpen(!open)} style={{width: "32.8px"}}><i className={open ? "bi bi-chevron-down" : "bi bi-chevron-right"}></i></td>
      <td onClick={() => setInfo(true)}>{address.id}</td>
      <td onClick={() => setInfo(true)}>{address.name}</td>
      <td onClick={() => setInfo(true)}>{address.typeName}</td>
      <td onClick={() => setInfo(true)}>{address.code}</td>
      <td onClick={() => setInfo(true)}>{address.okato}</td>
      <td onClick={() => setInfo(true)}>{address.oktmo}</td>
      <td onClick={() => setInfo(true)}>{address.level}</td>
      {openInfo && <ObjectInfo isModal={openInfo} setModal={setInfo} objectId={address.id}/>}
    </tr>
    {
      open &&
      <tr>
        <td></td>
        <td colSpan={7} className='p-0'>
          <Hierarchy id={address.id} type={"adm"} name="Административное деление" />
          <Hierarchy id={address.id} type={"mun"} name="Муниципальное деление" />
        </td>
      </tr>
    }
  </>
}