import React, { useState } from 'react'
import { RegionItem } from './RegionItem';
import { ObjectInfo } from './ObjectInfo';

export const Region = ({ address }) => {
  const [openInfo, setInfo] = useState(false);

  const [open, setOpen] = useState(false)

  return <>
    <tr key={address.id}>
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
      <tr key={address.id + ".1"}>
        <td></td>
        <td colSpan={7} className='p-0'>
          <table className="table table-sm mb-0" aria-labelledby="tableLabel">
            <tbody>
              <tr key={address.id + ".2"}><td className='pr-0'><RegionItem id={address.id} type={"adm"} name="Административное деление" /></td></tr>
              <tr key={address.id + ".3"}><td className='pr-0'><RegionItem id={address.id} type={"mun"} name="Муниципальное деление" /></td></tr>
            </tbody>
          </table>
        </td>
      </tr>
    }
  </>
}