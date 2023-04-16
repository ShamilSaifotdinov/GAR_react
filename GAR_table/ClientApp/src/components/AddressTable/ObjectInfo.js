import React, { useState, useEffect } from 'react'
import { Modal } from '../modal/Modal'


export const ObjectInfo = ({ isModal, setModal, objectId }) => {
    const [isLoading, setLoading] = useState(true)
    const [info, setInfo] = useState([])

    
    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await fetch(`addresses/info/${objectId}`);
                const data = await response.json()
                data.sort((a, b) => a.id - b.id)
                // console.log(data)
                setInfo(data)
            } catch (error) {
                // alert(error)
                setInfo([])
            }
            setLoading(false)
        }
        getInfo()
    }, [objectId])


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
                                ? info.map((item, i) =>
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{item.value}</td>
                                    </tr>)
                                : <tr key="1" colSpan={2}><td>Данные отсутствует</td></tr>
                        }
                    </tbody>
                </table>
            }
            footer={<button type="button" class="btn btn-primary" onClick={() => setModal(false)}>Закрыть</button>}
            onClose={() => setModal(false)}
        />
    )
}