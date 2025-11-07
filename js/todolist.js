document.addEventListener('DOMContentLoaded', function() {
    // Load from localStorage or set defaults
    let categories = JSON.parse(localStorage.getItem('categories')) || ['Général'];
    let tasksByCategory = JSON.parse(localStorage.getItem('tasksByCategory')) || { 'Général': [] };
    let currentCategory = localStorage.getItem('currentCategory') || 'Général';
    if (!categories.includes(currentCategory)) currentCategory = categories[0];

    const form = document.getElementById('new-task-form');
    const input = document.getElementById('new-task-input');
    const tasksList = document.getElementById('tasks');
    const categoriesTabs = document.getElementById('categories-tabs');
    const addCategoryBtn = document.getElementById('add-category-btn');

    function saveToStorage() {
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('tasksByCategory', JSON.stringify(tasksByCategory));
        localStorage.setItem('currentCategory', currentCategory);
    }

    function renderCategories() {
        categoriesTabs.innerHTML = '';
        categories.forEach(cat => {
            const li = document.createElement('li');
            // Label (click to edit)
            const label = document.createElement('span');
            label.textContent = cat;
            label.style.cursor = 'pointer';
            label.onclick = function(e) {
                // Edit category name on click (not on delete)
                if (cat !== 'Général') {
                    const newName = prompt('Nouveau nom de la catégorie :', cat);
                    if (newName && !categories.includes(newName)) {
                        const idx = categories.indexOf(cat);
                        categories[idx] = newName;
                        tasksByCategory[newName] = tasksByCategory[cat];
                        delete tasksByCategory[cat];
                        if (currentCategory === cat) currentCategory = newName;
                        saveToStorage();
                        renderCategories();
                        renderTasks();
                    }
                }
            };
            li.appendChild(label);
            // Delete button (red cross)
            if (cat !== 'Général') {
                const delBtn = document.createElement('button');
                delBtn.innerHTML = '&times;';
                delBtn.className = 'delete-category-btn';
                delBtn.title = 'Supprimer la catégorie';
                delBtn.onclick = function(e) {
                    e.stopPropagation();
                    if (confirm('Supprimer la catégorie et toutes ses tâches ?')) {
                        const idx = categories.indexOf(cat);
                        categories.splice(idx, 1);
                        delete tasksByCategory[cat];
                        if (currentCategory === cat) {
                            currentCategory = categories[0];
                        }
                        saveToStorage();
                        renderCategories();
                        renderTasks();
                    }
                };
                li.appendChild(delBtn);
            }
            li.className = (cat === currentCategory) ? 'active-category' : '';
            categoriesTabs.appendChild(li);
        });
    }

    addCategoryBtn.onclick = function() {
        const name = prompt('Nom de la nouvelle catégorie :');
        if (name && !categories.includes(name)) {
            categories.push(name);
            tasksByCategory[name] = [];
            currentCategory = name;
            saveToStorage();
            renderCategories();
            renderTasks();
        }
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText !== '') {
            tasksByCategory[currentCategory].push({ text: taskText, completed: false });
            input.value = '';
            saveToStorage();
            renderTasks();
        }
    });

    function renderTasks() {
        tasksList.innerHTML = '';
        (tasksByCategory[currentCategory] || []).forEach((task, idx) => {
            const li = document.createElement('li');
            if (task.completed) li.classList.add('completed');
            // Complete button
            const completeBtn = document.createElement('button');
            completeBtn.innerHTML = '<span style="font-size:1.2em">&#x2713;</span>';
            completeBtn.className = 'complete-btn';
            completeBtn.title = 'Mark as completed';
            completeBtn.setAttribute('aria-pressed', task.completed ? 'true' : 'false');
            completeBtn.style.background = task.completed ? '#28a745' : 'none';
            completeBtn.style.color = task.completed ? '#fff' : '#28a745';
            completeBtn.onclick = function() {
                task.completed = !task.completed;
                saveToStorage();
                renderTasks();
            };
            // Task text
            const span = document.createElement('span');
            span.textContent = task.text;
            span.style.cursor = 'pointer';
            span.ondblclick = function() {
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = span.textContent;
                editInput.className = 'edit-task-input';
                editInput.style.flex = '1';
                li.replaceChild(editInput, span);
                editInput.focus();
                function saveEdit() {
                    if (editInput.value.trim() !== '') {
                        task.text = editInput.value.trim();
                        saveToStorage();
                    }
                    li.replaceChild(span, editInput);
                    renderTasks();
                }
                editInput.addEventListener('blur', saveEdit);
                editInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        saveEdit();
                    } else if (e.key === 'Escape') {
                        li.replaceChild(span, editInput);
                    }
                });
            };
            // Delete button
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.className = 'delete-btn';
            delBtn.onclick = function() {
                tasksByCategory[currentCategory].splice(idx, 1);
                saveToStorage();
                renderTasks();
            };
            li.appendChild(completeBtn);
            li.appendChild(span);
            li.appendChild(delBtn);
            tasksList.appendChild(li);
        });
    }

    // Initial rendering
    renderCategories();
    renderTasks();
});
