import './Pagination.scss'

interface PaginationProps {
  pagesCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const Pagination = ({
  pagesCount,
  currentPage,
  setCurrentPage,
}: PaginationProps): JSX.Element => {
  const paginationButtons = Array(pagesCount).fill('')

  return (
    <div className="pagination">
      {paginationButtons.map((el, i) => {
        const page = i + 1
        const isActive = page === currentPage

        return (
          <button
            key={i}
            className={`pagination__button${isActive ? ' active' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}

export default Pagination
