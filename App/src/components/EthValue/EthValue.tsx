import React, {FC} from 'react';
import {IEtherPrice} from "../../@types/types";
import './EthValue.css'

interface IProps {
    ethValue: IEtherPrice
}

const EthValue: FC<IProps> = ({ethValue}) => {
    return (
        <div className={'ethContainer'}>
            <div className={'eth'}>
                <div className={'title'}>ETH Latest Price</div>
                ETHBTC {ethValue.ethbtc} = ETHUSD {ethValue.ethusd}
            </div>
        </div>
    )
}

export default EthValue
