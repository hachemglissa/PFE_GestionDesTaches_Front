import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

// components
import TodoList from './TodoList'
import TodoCreate from './TodoCreate'

// redux
import { onDragEndList, onDragEndCard } from 'redux/todo.reducer'
import { fetchLists } from 'redux/todo.reducer'

// selectors
import { getColumns, getLists, getCards } from 'redux/todo.selectors'

function Todo() {
  const dispatch = useDispatch()
  const columnsSelector = useSelector(getColumns)
  const listsSelector = useSelector(getLists)
  const cardsSelector = useSelector(getCards)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const projectId = localStorage.getItem('idProjet') // Retrieve projectId
    if (projectId) {
      dispatch(fetchLists(projectId)) // Pass projectId to fetchLists
    }
  }, [dispatch, refreshKey])

  const onDragEnd = (result) => {
    const { type } = result

    if (type === 'LIST') {
      dispatch(onDragEndList(result))
      return false
    }

    if (type === 'CARD') {
      dispatch(onDragEndCard(result))
      return false
    }
  }

  return (
    <div
      className="todo"
      // style={{
      //   width: 340 * columnsSelector.length || 1,
      // }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="LIST">
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="todo__container"
              >
                {columnsSelector.length > 0 ? (
                  <>
                    {columnsSelector.map((item, index) => {
                      const lists = listsSelector[item]
                      const cards = lists.cards
                        ? lists.cards.map((card) => cardsSelector[card])
                        : [] // Vérifie si lists.cards n'est pas null
                      return (
                        <TodoList
                          key={lists.id}
                          listId={lists.id}
                          title={lists.title}
                          cards={cards}
                          index={index}
                        />
                      )
                    })}
                  </>
                ) : null}
                {provided.placeholder}
                <TodoCreate isLists className="todo_add_list" />
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Todo
