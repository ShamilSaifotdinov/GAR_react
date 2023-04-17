import React, { useState, useEffect } from 'react'
import { Modal } from '../modal/Modal'
import { useAddresses } from '../../hooks/address.hook'


export const ObjectInfo = ({ isModal, setModal, objectId }) => {
    const [info, setInfo] = useState([])
    const [isLoading, getAddresses] = useAddresses()

    useEffect(() => {
        getAddresses(`info/${objectId}`)
            .then((data) => setInfo(data))
    }, [])

    return (
        <Modal
            isVisible={isModal}
            title={objectId}
            content={
                !isLoading &&
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <tbody>
                        {
                            info.length
                                ? info.map((item) =>
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.value}</td>
                                    </tr>)
                                : <tr colSpan={2}><td>Данные отсутствует</td></tr>
                        }
                    </tbody>
                </table>
            }
            footer={<button type="button" className="btn btn-primary" onClick={() => setModal(false)}>Закрыть</button>}
            onClose={() => setModal(false)}
        />
    )
}