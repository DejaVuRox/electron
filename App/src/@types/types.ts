export interface IResponse {
    message: string
    result: IResultResponse[]
    status: string
}

export interface IResultResponse {
    blockHash: string
    blockNumber: string
    confirmations: string
    contractAddress: string
    cumulativeGasUsed: string
    from: string
    gas: string
    gasPrice: string
    gasUsed: string
    hash: string
    input: string
    isError: string
    nonce: string
    timeStamp: string
    to: string
    transactionIndex: string
    txreceipt_status: string
    value: string
}

export interface IEtherPrice {
    ethbtc: string
    ethbtc_timestamp: string
    ethusd: string
    ethusd_timestamp: string
}
