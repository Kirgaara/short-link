import { useState, useEffect } from 'react'

import { LinkInfo } from '../../../types'
import { ApiUrl, URL } from '../../../consts'

import './Table.scss'

interface TableProps {
  statistics: Array<LinkInfo>
}

const Table = ({ statistics }: TableProps): JSX.Element => {
  const [copyTooltipVisibility, setCopyTooltipVisibility] = useState<boolean[]>(
    []
  )
  useEffect(() => {
    setCopyTooltipVisibility(Array(statistics.length).fill(false))
  }, [statistics])

  const onCopyButtonClick = (link: string, i: number) => {
    navigator.clipboard.writeText(link)
    setCopyTooltipVisibility(
      copyTooltipVisibility.map((value, index) => (index === i ? true : false))
    )

    setTimeout(() => {
      setCopyTooltipVisibility(copyTooltipVisibility.map(() => false))
    }, 3000)
  }
  return (
    <div className="table">
      <div className="table__headers">
        <div className="table__short"> Короткая ссылка </div>
        <div className="table__target"> Исходная ссылка </div>
        <div className="table__counter"> Кол-во переходов </div>
      </div>

      {statistics.map((link, i) => {
        return (
          <div key={i} className="table__row">
            <button
              className={`table__short item${
                copyTooltipVisibility[i] ? ' copied' : ''
              }`}
              onClick={() =>
                onCopyButtonClick(`${URL}${ApiUrl.LINK}/${link.short}`, i)
              }
            >
              {`${URL}${ApiUrl.LINK}/${link.short}`}
            </button>
            <div className="table__target">{link.target}</div>
            <div className="table__counter">{link.counter}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Table
