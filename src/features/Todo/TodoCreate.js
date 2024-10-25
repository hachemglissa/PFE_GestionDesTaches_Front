import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

// components
import TodoForm from './TodoForm' // Corrected the component name from TodoFrom to TodoForm
import ButtonIcon from 'components/ButtonIcon'

// actions
import { addList, addCard } from '../../redux/todo.reducer'

const TodoCreate = ({ isLists, listId, className }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('') // New state for description
  const [priority, setPriority] = useState('') // New state for priority
  const [startDate, setStartDate] = useState('') // New state for start date
  const [dueDate, setDueDate] = useState('') // New state for due date
  const [statusId, setStatusId] = useState(null) // New state for statusId
  const [openForm, setOpenForm] = useState(false)
  const projectId = localStorage.getItem('idProjet')

  const label = isLists ? 'Add another list' : 'Add a card'
  const placeholder = isLists
    ? 'Enter list title...'
    : 'Enter a title for this card...'

  const handleCloseForm = () => {
    setOpenForm(false)
    // Reset states when closing the form
    setTitle('')
    setDescription('')
    setPriority('')
    setStartDate('')
    setDueDate('')
    setStatusId(null)
  }

  const handleOpenForm = () => {
    setOpenForm(true)
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const onChangePriority = (e) => {
    setPriority(e.target.value)
  }

  const onChangeStartDate = (e) => {
    setStartDate(e.target.value)
  }

  const onChangeDueDate = (e) => {
    setDueDate(e.target.value)
  }

  const onChangeStatusId = (e) => {
    setStatusId(e.target.value) // Assuming statusId is a simple string or number
  }

  const handleAddList = () => {
    console.log('handleAddList', title)

    if (title === '') return

    const id = `list-${uuidv4()}`
    const newList = {
      id,
      title,
      cards: [],
    }
    dispatch(addList(newList))
    setTitle('')
  }

  const handleAddCard = () => {
    if (title === '') return
    // console.log('statusId',listId)
    //const statusId = listId.match(/\d+/g)

    const newCards = {
      //id: `card-${uuidv4()}`, // Generate a unique ID for the card
      title,
      description: ' ', // Include description
      priority: 'low', // Include priority
      startDate: new Date(), // Include start date
      dueDate: new Date(), // Include due date
      statusId: listId, // List ID
      projectId: Number(projectId), // Include status ID
    }
    console.log('newCard==>', newCards)

    dispatch(addCard(listId, newCards))
    handleCloseForm() // Reset fields after adding the card
  }

  return (
    <div className={className}>
      {openForm ? (
        <>
          <TodoForm
            text={title}
            placeholder={placeholder}
            onChange={onChangeTitle}
            handleCloseForm={handleCloseForm}
          >
            <button
              type="button"
              className="button_primary"
              onMouseDown={isLists ? handleAddList : handleAddCard}
            >
              Save
            </button>
          </TodoForm>
        </>
      ) : (
        <div className="todoCreate__button" onClick={handleOpenForm}>
          <ButtonIcon icon="material-symbols:add" color="#fff" />
          <span>{label}</span>
        </div>
      )}
    </div>
  )
}

export default memo(TodoCreate)
