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
            // Label (select category)
            const label = document.createElement('span');
            label.textContent = cat;
            label.style.cursor = 'pointer';
            label.onclick = function() {
                currentCategory = cat;
                saveToStorage();
                renderCategories();
                renderTasks();
            };
            li.appendChild(label);
            // Edit button (...)
            if (cat !== 'Général') {
                const editBtn = document.createElement('button');
                editBtn.textContent = '...';
                editBtn.className = 'edit-category-btn';
                editBtn.title = 'Renommer la catégorie';
                editBtn.onclick = function(e) {
                    e.stopPropagation();
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
                };
                li.appendChild(editBtn);
                // Delete button (red cross)
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
        const descInput = document.getElementById('new-task-desc');
        const taskDesc = descInput ? descInput.value.trim() : '';
        if (taskText !== '') {
            tasksByCategory[currentCategory].push({ text: taskText, desc: taskDesc, completed: false });
            input.value = '';
            if (descInput) descInput.value = '';
            saveToStorage();
            renderTasks();
        }
    });

    // Helper: Simple Markdown to HTML (bold, italic, link, linebreak, checkboxes)
    function renderMarkdown(text) {
        if (!text) return '';
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // italic
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>') // link
            .replace(/\[ \]/g, '<input type="checkbox" class="desc-checkbox">') // unchecked checkbox
            .replace(/\[x\]/gi, '<input type="checkbox" class="desc-checkbox" checked>') // checked checkbox
            .replace(/\n/g, '<br>'); // linebreak
        return html;
    }

    function renderTasks() {
        tasksList.innerHTML = '';
        // Sépare les tâches non terminées et terminées
        const allTasks = tasksByCategory[currentCategory] || [];
        const uncompleted = allTasks.filter(task => !task.completed);
        const completed = allTasks.filter(task => task.completed);
        // Affiche d'abord les non terminées, puis les terminées
        [...uncompleted, ...completed].forEach((task, idx) => {
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
            const textContainer = document.createElement('div');
            textContainer.style.flex = '1';
            textContainer.style.display = 'flex';
            textContainer.style.flexDirection = 'column';
            // Title (editable)
            const span = document.createElement('span');
            span.textContent = task.text;
            span.style.cursor = 'pointer';
            span.ondblclick = function() {
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = span.textContent;
                editInput.className = 'edit-task-input';
                editInput.style.flex = '1';
                textContainer.replaceChild(editInput, span);
                editInput.focus();
                function saveEdit() {
                    if (editInput.value.trim() !== '') {
                        task.text = editInput.value.trim();
                        saveToStorage();
                    }
                    textContainer.replaceChild(span, editInput);
                    renderTasks();
                }
                editInput.addEventListener('blur', saveEdit);
                editInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        saveEdit();
                    } else if (e.key === 'Escape') {
                        textContainer.replaceChild(span, editInput);
                    }
                });
            };
            textContainer.appendChild(span);
            // Description (editable, markdown)
            const desc = document.createElement('small');
            desc.className = 'task-desc';
            desc.style.cursor = 'pointer';
            desc.style.opacity = '0.8';
            desc.innerHTML = renderMarkdown(task.desc || '');
            // Enable ticking checkboxes in description
            Array.from(desc.querySelectorAll('input[type="checkbox"]')).forEach((checkbox, i) => {
                checkbox.addEventListener('change', function(e) {
                    let matches = [...(task.desc || '').matchAll(/\[( |x)\]/gi)];
                    if (matches[i]) {
                        let before = (task.desc || '').slice(0, matches[i].index);
                        let after = (task.desc || '').slice(matches[i].index + 3);
                        let newBox = checkbox.checked ? '[x]' : '[ ]';
                        task.desc = before + newBox + after;
                        saveToStorage();
                        renderTasks();
                    }
                });
            });
            desc.ondblclick = function() {
                const editDesc = document.createElement('input');
                editDesc.type = 'text';
                editDesc.value = task.desc || '';
                editDesc.className = 'edit-task-input';
                editDesc.style.flex = '1';
                textContainer.replaceChild(editDesc, desc);
                editDesc.focus();
                function saveEditDesc() {
                    task.desc = editDesc.value.trim();
                    saveToStorage();
                    textContainer.replaceChild(desc, editDesc);
                    renderTasks();
                }
                editDesc.addEventListener('blur', saveEditDesc);
                editDesc.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        saveEditDesc();
                    } else if (e.key === 'Escape') {
                        textContainer.replaceChild(desc, editDesc);
                    }
                });
            };
            textContainer.appendChild(desc);
            // Delete button
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.className = 'delete-btn';
            delBtn.onclick = function() {
                const all = tasksByCategory[currentCategory];
                // Retrouve l'index réel de la tâche dans le tableau d'origine
                const realIdx = all.indexOf(task);
                if (realIdx !== -1) {
                    all.splice(realIdx, 1);
                    saveToStorage();
                    renderTasks();
                }
            };
            li.appendChild(completeBtn);
            li.appendChild(textContainer);
            li.appendChild(delBtn);
            tasksList.appendChild(li);
        });
    }

    // Initial rendering
    renderCategories();
    renderTasks();
});
