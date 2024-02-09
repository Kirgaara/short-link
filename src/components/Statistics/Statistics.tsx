import { useState, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  getStatistics,
  getStatisticsTotal,
} from '../../store/reducers/dataReducer'
import { RootState } from '../../store/store'

import Table from './Table/Table'
import Pagination from './Pagination/Pagination'
import Sort from './Sort/Sort'
import './Statistics.scss'

const LINKS_MAX = 10

const Statistics = (): JSX.Element => {
  const [sortType, setSortType] = useState('asc_short')
  const [currentPage, setCurrentPage] = useState(1)

  const { statistics, statisticsTotal, statisticsError } = useAppSelector(
    (state: RootState) => state.dataReducer
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      getStatisticsTotal({ order: 'asc_short', offset: 0, limit: 999999 })
    )
  }, [dispatch])

  useEffect(() => {
    dispatch(
      getStatistics({
        order: sortType,
        offset: (currentPage - 1) * LINKS_MAX,
        limit: LINKS_MAX,
      })
    )
  }, [sortType, currentPage, dispatch])

  const pagesCount = Math.ceil(statisticsTotal / LINKS_MAX)

  return (
    <section className="statistics">
      <h1 className="statistics__title">Статистика</h1>
      {statisticsError ? (
        <p className="statistics__error-message">{statisticsError}</p>
      ) : !statistics || !statistics.length ? (
        <p className="statistics__empty-message">Статистика пуста</p>
      ) : (
        <>
          <div className="statistics__sort">
            <Sort changeSortType={setSortType} />
          </div>

          <div className="statistics__table">
            <Table statistics={statistics} />
          </div>

          {statisticsTotal > LINKS_MAX ? (
            <div className="statistics__pagination">
              <Pagination
                pagesCount={pagesCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : null}
        </>
      )}
    </section>
  )
}

export default Statistics
