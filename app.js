const input = document.getElementById('input')
const btnAdd = document.getElementById('btnAdd')
const list = document.getElementById('list')
let taskId = 1

btnAdd.addEventListener('click', () => {
	if (input.value.length === 0) return

	const li = document.createElement('li')
	li.className =
		'list-group-item text-start d-flex justify-content-between align-items-center flex-wrap'

	const taskNumber = document.createElement('span')
	taskNumber.className = 'task-number' 
	taskNumber.textContent = ` ${taskId++} : `

	const taskText = document.createElement('span')
	taskText.className = 'task-text'
	taskText.textContent = input.value

	const btnDel = document.createElement('button')
	btnDel.innerHTML = 'Видалити'
	btnDel.className = 'btn btn-outline-danger'

	const btnEdit = document.createElement('button')
	btnEdit.innerHTML = 'Редагувати'
	btnEdit.className = 'btn btn-outline-warning'

	const buttonDiv = document.createElement('div')
	buttonDiv.className = 'btn-group'
	buttonDiv.appendChild(btnEdit)
	buttonDiv.appendChild(btnDel)

	const timer = document.createElement('span')
	timer.className = 'timer'
	const startTime = new Date()
	const creationTime = startTime.toLocaleString()
	timer.textContent = `Створено: ${creationTime}`

	li.appendChild(taskNumber)
	li.appendChild(taskText)
	li.appendChild(timer)
	li.appendChild(buttonDiv)
	list.appendChild(li)

	btnEdit.addEventListener('click', function editTask() {
		const editTextarea = document.createElement('textarea')
		editTextarea.value = taskText.textContent
		editTextarea.className = 'edit-textarea'
		adjustTextareaHeight(editTextarea)

		editTextarea.addEventListener('input', () =>
			adjustTextareaHeight(editTextarea)
		)

		li.insertBefore(editTextarea, taskText)
		li.removeChild(taskText)
		btnEdit.innerHTML = 'Зберегти'

		btnEdit.removeEventListener('click', editTask)
		btnEdit.addEventListener('click', function saveTask() {
			if (editTextarea.value.length === 0) return
			taskText.textContent = editTextarea.value
			li.insertBefore(taskText, editTextarea)
			li.removeChild(editTextarea)
			btnEdit.innerHTML = 'Редагувати'

			btnEdit.removeEventListener('click', saveTask)
			btnEdit.addEventListener('click', editTask)
		})
	})

	btnDel.addEventListener('click', () => {
		list.removeChild(li)
		updateTaskNumbers() 
	})

	input.value = ''
})

function adjustTextareaHeight(textarea) {
	textarea.style.height = 'auto'
	textarea.style.height = textarea.scrollHeight + 'px'
}

function updateTaskNumbers() {
	const taskItems = list.querySelectorAll('li')
	taskId = 1 
	taskItems.forEach(taskItem => {
		const taskNumber = taskItem.querySelector('.task-number')
		taskNumber.textContent = ` ${taskId++} : `
	})
}
