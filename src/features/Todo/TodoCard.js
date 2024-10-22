import React, { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { FaUser } from 'react-icons/fa'

// components
import TodoFormModal from './TodoFormModal'
import TodoForm from './TodoForm'
import ButtonIcon from 'components/ButtonIcon'
import Modal from './modal' // Import the Modal component

// redux
import {
  removeCard,
  editCard,
  getCardById,
  getUsersByRole,
} from '../../redux/todo.reducer'

const TodoCard = ({ cardId, title, listId, index }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [cardText, setCardText] = useState(title)
  const projectId = localStorage.getItem('idProjet')
  const statusId = listId.match(/\d+/g)
  const CId = Number(cardId.match(/\d+/g))
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [users, setUsers] = useState([]) // State for users
  const [selectedUserId, setSelectedUserId] = useState('')

  const [isModalOpen, setModalOpen] = useState(false) // State for modal visibility
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return { color: 'red', label: 'H' } // Rouge pour High
      case 'Medium':
        return { color: 'yellow', label: 'M' } // Jaune pour Medium
      case 'Low':
        return { color: 'green', label: 'L' } // Vert pour Low
      default:
        return { color: 'black', label: '' } // Couleur par défaut
    }
  }
  const priorityStyle = getPriorityStyle(priority) // Obtenez le style basé sur la priorité

  const handleCloseForm = () => {
    setIsEditing(false)
    setModalOpen(false)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const action = await dispatch(getUsersByRole())
      if (action && Array.isArray(action)) {
        setUsers(action)
      } else {
        console.error('Aucun utilisateur trouvé ou action mal formée')
      }
    }
    fetchUsers()
  }, [dispatch])

  useEffect(() => {
    const fetchCardDetails = async () => {
      const action = await dispatch(getCardById(CId))
      if (action) {
        setDescription(action.description)
        setPriority(action.priority)
        setDueDate(new Date(action.dueDate).toISOString().split('T')[0])
        setStartDate(new Date(action.startDate).toISOString().split('T')[0])
        setSelectedUserId(action.userId || '')
      }
    }

    fetchCardDetails() // Appelez la fonction pour récupérer les détails de la carte
  }, [dispatch, CId]) // Se déclenche lorsque CId change

  const handleEditCard = () => {
    const data = {
      title: cardText,
      description: description,
      priority: priority,
      startDate: '2024-09-20T15:42:41.761',
      dueDate: '2024-09-20T15:42:41.761',
      projectId: Number(projectId),
      statusId: Number(statusId),
      userId: selectedUserId,
    }
    dispatch(editCard(cardId, data))
    dispatch(getCardById(CId))
    handleCloseForm()
  }

  const onChange = (e) => {
    setCardText(e.target.value)
  }
  const handleFormChange = (field, value) => {
    switch (field) {
      case 'title':
        setCardText(value)
        break
      case 'description':
        setDescription(value)
        break
      case 'priority':
        setPriority(value)
        break
      case 'startDate':
        setStartDate(value)
        break
      case 'dueDate':
        setDueDate(value)
        break
      case 'userId':
        setSelectedUserId(value)
        break
      default:
        break
    }
  }

  const handleRemoveCard = () => {
    dispatch(removeCard(listId, cardId))
  }
  const handleShowCard = async () => {
    const action = await dispatch(getCardById(CId))
    if (action) {
      setDescription(action.description)
      setPriority(action.priority)
      setDueDate(new Date(action.dueDate).toISOString().split('T')[0])
      setStartDate(new Date(action.startDate).toISOString().split('T')[0])
      setSelectedUserId(action.userId || '') // Assurez-vous que userId est défini
      dispatch(getCardById(CId))
    }
    setModalOpen(true)
  }

  const renderTextarea = () => (
    <TodoForm
      text={cardText}
      onChange={onChange}
      handleCloseForm={handleCloseForm}
    >
      <button
        type="button"
        onMouseDown={handleEditCard}
        className="button_primary"
      >
        Save
      </button>
    </TodoForm>
  )

  const renderCard = () => (
    <div className="todoCard">
      <p style={{ color: priorityStyle.color, float: 'right' }}>
        {priorityStyle.label}
      </p>{' '}
      {}
      <div className="todoCard__button">
        <ButtonIcon
          icon="material-symbols:visibility"
          color="#fff"
          width={16}
          onClick={handleShowCard}
        />
        <ButtonIcon
          icon="material-symbols:delete-outline"
          color="#fff"
          width={16}
          onClick={handleRemoveCard}
        />
      </div>
      <div className="todoCard__title">{title}</div>
    </div>
  )

  return (
    <Draggable draggableId={String(cardId)} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
            className="todoCard__container"
          >
            {isEditing ? renderTextarea() : renderCard()}
            <Modal isOpen={isModalOpen} onClose={handleCloseForm}>
              <div className="modal-content">
                <h2>Edit Card</h2>
                <TodoFormModal
                  title={cardText} // State variable for title
                  description={description} // State variable for description
                  priority={priority} // State variable for priority
                  startDate={startDate} // State variable for start date
                  dueDate={dueDate} // State variable for due date
                  users={users}
                  selectedUserId={selectedUserId} // Passer l'ID de l'utilisateur sélectionné
                  onChange={handleFormChange} // Function to handle input changes
                  handleCloseForm={handleCloseForm}
                >
                  <button
                    type="button"
                    onMouseDown={handleEditCard}
                    className="button_primary"
                  >
                    Save
                  </button>
                </TodoFormModal>
              </div>
            </Modal>
          </div>
        )
      }}
    </Draggable>
  )
}

export default memo(TodoCard)
