import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { RootState } from '../../store/store'
import { getShortLink } from '../../store/reducers/dataReducer'

import Button from '../UI/Button/Button'
import TextInput from '../UI/TextInput/TextInput'
import './Squeeze.scss'

const Squeeze = (): JSX.Element => {
  const [linkValue, setLinkValue] = useState('')
  const [copyTooltipVisibility, setCopyTooltipVisibility] = useState(false)
  const { shortLink, linkError } = useAppSelector(
    (state: RootState) => state.dataReducer
  )
  const dispatch = useAppDispatch()

  const onCopyButtonClick = () => {
    navigator.clipboard.writeText(shortLink)
    setCopyTooltipVisibility(true)

    setTimeout(() => {
      setCopyTooltipVisibility(false)
    }, 3000)
  }

  const onSqueezeFormSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault()
    dispatch(getShortLink(linkValue))
  }

  return (
    <section className="squeeze">
      <h1 className="visually-hidden">Сокращение ссылок</h1>

      <p className="squeeze__title">Введите ссылку для сжатия</p>

      <form className="squeeze__form" action="" onSubmit={onSqueezeFormSubmit}>
        <div className="squeeze__input">
          <TextInput
            value={linkValue}
            placeholder={'http://source.com'}
            onChange={(evt) =>
              setLinkValue((evt.target as HTMLInputElement).value)
            }
            required={true}
          />
        </div>
        <Button text="Сжать" type="submit" />
        <Button text="Очистить" onClick={() => setLinkValue('')} />

        {linkError ? <p className="squeeze__error">{linkError}</p> : null}
      </form>

      {shortLink ? (
        <>
          <p className="squeeze__title">Сокращенная ссылка:</p>
          <button
            className={`squeeze__copy-link${
              copyTooltipVisibility ? ' copied' : ''
            }`}
            onClick={onCopyButtonClick}
          >
            {shortLink}
          </button>
        </>
      ) : null}
    </section>
  )
}

export default Squeeze
