import React, {useEffect, useRef, useState} from 'react';
import Table from "./Table/Table";
import {IResultResponse, IResponse, IEtherPrice} from "../@types/types";
import './App.css'
import EthValue from "./EthValue/EthValue";

const TOKEN = '8MBREP1H1V967K4EH76Z7QMYX559MWSDYK'
// 0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a
// 0x332b56c3f4b27548169da3bb58a97d8ed7fd36e9
// 0x3f1b1af91538ad424fff41f9495525265e87e4be

const App = () => {
    const [invalidAddressMessage, setInvalidAddressMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [latestEtherPrice, setLatestEtherPrice] = useState<IEtherPrice | null>(null)
    const [responseData, setResponseData] = useState<IResultResponse[] | null>()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        getLatestETHERPrice()
    }, [])

    const getLatestETHERPrice = async () => {
        try {
            const response = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${TOKEN}`)

            if (!response.ok) {
                throw new Error('something went wrong')
            }

            const resData = await response.json();
            setLatestEtherPrice(resData.result)

        } catch (e) {
            console.log(e.message)
        }
    }

    const handlesSearch = async () => {
        setIsLoading(true)
        setInvalidAddressMessage('')

        try {
            const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${inputRef.current.value}&startblock=0&endblock=99999999&sort=asc&apikey=${TOKEN}`)

            if (!response.ok) {
                throw new Error('something went wrong')
            }

            setResponseData(null)
            const resData: IResponse = await response.json();

            switch (resData.status) {
                case '0':
                    setInvalidAddressMessage(resData.result as unknown as string)
                    setResponseData(null)
                    break

                case '1':
                    setResponseData(resData.result)
                    break
            }

        } catch (e) {
            console.log(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={'mainContainer'}>
            {/*------------------------------------------- SEARCH -------------------------------------------*/}
            <div className={'searchContainer'}>
                <input className={'input'} ref={inputRef} placeholder={'Type address...'}/>
                <button className={'btn'} onClick={handlesSearch}>search</button>
            </div>


            {/*------------------------------------------- ERROR -------------------------------------------*/}
            <div className={'error'}>
                {invalidAddressMessage}
            </div>

            {/*------------------------------------------- ETH-PRICE -------------------------------------------*/}
            <div>
                {latestEtherPrice && <EthValue ethValue={latestEtherPrice}/>}
            </div>

            {/*------------------------------------------- LOADING -------------------------------------------*/}
            <div className={'loading'}>
                {isLoading && 'Fetching Data...'}
            </div>

            {/*------------------------------------------- TABLE -------------------------------------------*/}
            <div className={'tableContainer'}>
                <Table data={responseData}/>
            </div>
        </div>
    )
}

export default App
