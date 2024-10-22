import React, { memo } from 'react'

const TodoFormModal = ({
  title,
  description,
  priority,
  startDate,
  dueDate,
  users,
  selectedUserId,
  onChange,
  handleCloseForm,
  children,
}) => {
  return (
    <div className="todoForm">
      <label className="todoForm__label">Title*</label>
      <input
        type="text"
        value={title}
        onChange={(e) => onChange('title', e.target.value)}
        placeholder="Title"
        className="todoForm__input"
      />

      <label className="todoForm__label">Description</label>
      <textarea
        value={description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder="Description"
        rows={3}
        className="todoForm__textarea"
      />

      <label className="todoForm__label">Priority*</label>
      <select
        value={priority}
        onChange={(e) => onChange('priority', e.target.value)}
        className="todoForm__input"
      >
        <option value="" disabled>
          Select Priority
        </option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label className="todoForm__label">Start Date</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => onChange('startDate', e.target.value)}
        className="todoForm__input"
      />

      <label className="todoForm__label">Due Date</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => onChange('dueDate', e.target.value)}
        className="todoForm__input"
      />

      <label className="todoForm__label">Assign User</label>
      <select
        className="todoForm__input"
        value={selectedUserId}
        onChange={(e) => onChange('userId', e.target.value)}
      >
        <option value="" disabled>
          Select a User
        </option>
        {users.length > 0 ? (
          users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.userName}
            </option>
          ))
        ) : (
          <option disabled>Aucun utilisateur trouvé</option>
        )}
      </select>

      <div className="todoForm__button">{children}</div>
    </div>
  )
}

export default memo(TodoFormModal)
