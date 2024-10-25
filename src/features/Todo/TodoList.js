import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'

// components
import ButtonIcon from 'components/ButtonIcon'
import TodoCard from './TodoCard'
import TodoCreate from './TodoCreate'

// redux
import { changeTitleList, removeList } from '../../redux/todo.reducer'

function TodoList({ title, cards = [], listId, index }) {
  // Default to empty array for safety
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [listTitle, setListTitle] = useState(title)

  const handleFocus = (e) => {
    e.target.select()
  }

  const handleEditTitleList = () => {
    // Formatage de listId si nécessaire
    const listIdFormatted = Number(listId.match(/\d+/)[0])
    console.log('listIdFormatted', listIdFormatted)

    // Dispatch de l'action avec les paramètres corrects
    dispatch(changeTitleList(listIdFormatted, listTitle))
      .then(() => {
        // Rafraîchir la page après la mise à jour
        window.location.reload()
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du titre :', error)
      })

    setIsEditing(false)
  }

  const handleRemove = () => {
    const listIdFormatted = Number(listId.match(/\d+/)[0])
    console.log('listIdFormatted', listIdFormatted)

    // Dispatch de l'action pour supprimer la liste
    dispatch(removeList({ listIdFormatted }))
      .then(() => {
        // Rafraîchir la page après la suppression
        window.location.reload()
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la liste :', error)
      })
  }

  return (
    <Draggable draggableId={String(listId)} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="todoList"
        >
          <Droppable droppableId={String(listId)} type="CARD">
            {(providedDrop) => (
              <>
                <div>
                  <div className="todoList__head">
                    <div
                      className="todoList__head__title"
                      onClick={() => setIsEditing(true)}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          id={String(listId)}
                          autoFocus
                          onFocus={handleFocus}
                          onBlur={handleEditTitleList}
                          onChange={(e) => setListTitle(e.target.value)}
                          value={listTitle}
                          className="todoList__input"
                        />
                      ) : (
                        title
                      )}
                    </div>
                    <ButtonIcon
                      icon="material-symbols:delete-outline"
                      color="#fff"
                      onClick={handleRemove}
                    />
                  </div>
                </div>
                <div
                  {...providedDrop.droppableProps}
                  ref={providedDrop.innerRef}
                  className="todoList__content"
                >
                  {cards.length > 0 ? (
                    cards
                      .filter((card) => card?.id && card?.title) // Ensuring card has id and title
                      .map((card, idx) => (
                        <TodoCard
                          key={card.id}
                          cardId={card.id}
                          title={card.title}
                          index={idx}
                          listId={listId}
                          member={card.member}
                        />
                      ))
                  ) : (
                    <p>No cards available</p> // Optional: Message if no cards
                  )}
                  {providedDrop.placeholder}
                </div>
                <TodoCreate listId={listId} className="button_list" />
              </>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default TodoList
