import React, {FC} from 'react';
import {IResultResponse} from "../../@types/types";
import './Table.css'

interface IProps {
    data: IResultResponse[]
}

const Table: FC<IProps> = ({data}) => {

    if (data) {
        const mappedTable = data.map((data, i) => {
                const time = new Date(parseInt(data.timeStamp)).toLocaleTimeString('en-US', {hour12: false})
                return (
                    <tr key={i + data.hash}>
                        <td>{time}</td>
                        <td>{data.from}</td>
                        <td>{data.to}</td>
                        <td>{data.value}</td>
                        <td>{data.confirmations}</td>
                        <td>{data.hash}</td>
                    </tr>
                )
            }
        )

        return (
            <div className={'table'}>
                <table cellSpacing="0">
                    <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Value</th>
                        <th>Confirmations</th>
                        <th>Hash</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mappedTable}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <></>
    )
}

export default Table
