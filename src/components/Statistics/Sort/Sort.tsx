import './Sort.scss'

const SortValues = {
  asc_short: 'Короткие ссылки от A до Z',
  desc_short: 'Короткие ссылки от Z до A',
  asc_target: 'Изначальные ссылки от A до Z',
  desc_target: 'Изначальные ссылки от Z до A',
  asc_counter: 'По возврастанию кол-ва просмотров',
  desc_counter: 'По убыванию кол-ва просмотров',
}

interface SortProps {
  changeSortType: (type: string) => void
}

const Sort = ({ changeSortType }: SortProps): JSX.Element => {
  const onSelectChange = (evt: React.SyntheticEvent) => {
    const type = (evt.target as HTMLSelectElement).value
    changeSortType(type)
  }

  return (
    <div className="sort">
      <select className="sort__select" name="" id="" onChange={onSelectChange}>
        {Object.keys(SortValues).map((sort, i: number) => {
          return (
            <option key={i} className="sort__option" value={sort}>
              {SortValues[sort as keyof typeof SortValues]}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Sort
