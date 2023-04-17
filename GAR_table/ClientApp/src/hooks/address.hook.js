import { useState } from 'react'

export const useAddresses = () => {
    const [isLoading, setLoading] = useState(false)

    const getAddresses = async (path) => {
        try {
            setLoading(true)
            const response = await fetch(`addresses/${path}`);
            const data = await response.json();

            setLoading(false)

            if (typeof data !== 'object') {
                throw Error("Invalid response")
            }

            return data
        } catch (error) {
            alert(error)
            setLoading(false)
            return []
        }
    }

    return [isLoading, getAddresses]
}
